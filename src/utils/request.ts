import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router/index'
import qs from 'qs'

const request = axios.create({

})

request.interceptors.request.use(function (config) {
	const { user } = store.state
	if (user && user.access_token) {
		config.headers.Authorization = user.access_token
	}
	return config
}, function (error) {
	return Promise.reject(error)
})

function redirectToLogin () {
	router.push({
		name: 'login',
		query: {
			redirect: router.currentRoute.fullPath
		}
})
}
let isRefreshing = false
let requests: any[] = []
request.interceptors.response.use(function (response) {
	return response
}, async function (error) {
	if (error.response) {
		const { status } = error.response
		if (status === 400) {
			Message.error('请求参数错误')
		} else if (status === 401) {
			if (!store.state.user) {
				redirectToLogin()
				return Promise.reject(error)
			}

			if (!isRefreshing) {
				try {
					isRefreshing = true
					const { data } = await axios.create({})({
						method: 'POST',
						url: '/front/user/refresh_token',
						data: qs.stringify({
							refreshtoken: store.state.user.refresh_token
						})
					})

					if (!data.success) {
						throw new Error('刷新 Token 失败')
					}
	
					store.commit('setUser', data.content)
					requests.map(req => req())
					requests = []
					return request(error.config)
				} catch (e) {
					Message.warning('登录过期，请重新登录')
					store.commit('setUser', null)
					redirectToLogin()
					return Promise.reject(error)
				} finally {
					isRefreshing = false
				}	
			}

			return new Promise(resolve => {
				requests.push(() => {
					resolve(request(error.config))
				})
			})
		} else if (status === 403) {
			Message.error('没有权限，请联系管理员')
		} else if (status === 404) {
			Message.error('Not found')
		} else if (status >= 500) {
			Message.error('Internal error')
		}
		console.log(error.response)
	} else if (error.request) {
		console.log(error.request)
	}
	console.log('error config', error.config)
	return Promise.reject(error)
})

export default request
