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

export const saveOrUpdate = (data: any) => {
    return request({
        url: '/front/ad/saveOrUpdate',
        method: 'POST',
        data
    })
}

export const getAdById = (id: number) => {
    return request({
        url: '/front/ad/getAdById',
        params: {
            id
        }
    })
}
