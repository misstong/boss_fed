import request from '@/utils/request'

export const saveOrUpdate = (data: any) => {
    return request({
        url: '/front/ad/space/saveOrUpdate',
        method: 'POST',
        data
    })
}

export const getSpaceById = (id: any) => {
    return request({
        url: '/front/ad/space/getSpaceById',
        params: {
            id
        }
    })
}
