import qs from 'qs'
import request from '@/utils/request'

interface User {
    phone: string;
    password: string;
}

export const login = async (data: User) => {
   return request({
        url: '/front/user/login',
        headers: { 'content-type': 'x-www-form-urlencoded' },
        data: qs.stringify(data)
    })
}

export const getUserInfo = () => {
    return request({
        method: 'GET',
        url: '/front/user/getInfo'
    })
}
