import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

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

request.interceptors.response.use(function (response) {
	return response
}, function (error) {
	if (error.response) {
		const { status } = error.response
		if (status === 400) {
			Message.error('请求参数错误')
		} else if (status === 401) {
			if (!store.state.user) {

			}
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
