import qs from 'qs'
import request from '@/utils/request'

interface User {
    phone: string;
    password: string;
}

export const login = async (data: User) => {
  console.log('form', qs.stringify(data))
   return request({
        url: '/front/user/login',
        // headers: { 'content-type': 'x-www-form-urlencoded' },
        data: qs.stringify(data),
        method: 'POST'
    })
}

export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/front/user/getInfo'
    })
}

export const getUserPages = (data: any) => {
    return request({
      method: 'POST',
      url: '/boss/user/getUserPages',
      data
    })
  }
  
  export const forbidUser = (userId: string | number) => {
    return request({
      method: 'POST',
      url: '/boss/user/forbidUser',
      params: {
        userId
      }
    })
  }
