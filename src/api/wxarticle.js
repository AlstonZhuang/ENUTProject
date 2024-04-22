import request from '@/utils/request'
//查询文章接口
export function getWxArticleList(params) {
  return request({
    url: '/wxarticle/list',
    method: 'get',
    params
  })
}
//新增文章接口
export function addWxArticle(data) {
  return request({
    url: '/wxarticle/create',
    method: 'post',
    data
  })
}

//删除文章接口
export function removeWxArticle(data) {
  return request({
    url: '/wxarticle/remove',
    method: 'post',
    data
  })
}

