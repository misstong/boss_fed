import request from '@/utils/request'

export const getAll = () => {
    return request({
        url: '/front/ad/getAdList'
    })
}

export const updateStatus = (data: any) => {
    console.log('data', data)
    return request({
        url: '/front/ad/updateStatus',
        params: {
            id: data.id,
            status: data.status
        }
    })
}
