//获取中文尿疗资料
import request from '@/utils/request'
export function getUrineTherapyDataList(params) {
  return request({
    url: '/utdata/list',
    method: 'get',
    params
  })
}

//新增中文尿疗资料
export function addUrineTherapyDataArticle(data) {
  return request({
    url: '/utdata/create',
    method: 'post',
    data
  })
}

//删除
export function removeUrineTherapyDataArticle(data) {
  return request({
    url: '/utdata/remove',
    method: 'post',
    data
  })
}

//详情接口
export function getUrineTherapyDataDetail(params) {
  return request({
    url: '/utdata/detail',
    method: 'get',
    params
  })
}


//日语尿疗资料模块
//获取日语尿疗资料
export function getJPUrineTherapyDataList(params) {
  return request({
    url: '/utdata/jplist',
    method: 'get',
    params
  })
}

//新增日语尿疗资料
export function addJPUrineTherapyDataArticle(data) {
  return request({
    url: '/utdata/jpcreate',
    method: 'post',
    data
  })
}

//详情接口
export function getJPUrineTherapyDataDetail(params) {
  return request({
    url: '/utdata/jpdetail',
    method: 'get',
    params
  })
}

//删除
export function removeJPUrineTherapyDataArticle(data) {
  return request({
    url: '/utdata/jpremove',
    method: 'post',
    data
  })
}

//英语尿疗资料模块
//获取英语尿疗资料
export function getENUrineTherapyDataList(params) {
  return request({
    url: '/utdata/enlist',
    method: 'get',
    params
  })
}

//新增日语尿疗资料
export function addENUrineTherapyDataArticle(data) {
  return request({
    url: '/utdata/encreate',
    method: 'post',
    data
  })
}

//详情接口
export function getENUrineTherapyDataDetail(params) {
  return request({
    url: '/utdata/endetail',
    method: 'get',
    params
  })
}

//删除
export function removeENUrineTherapyDataArticle(data) {
  return request({
    url: '/utdata/enremove',
    method: 'post',
    data
  })
}








//以下接口仅用于测试微信小程序的部分接口
//获取用户openid
export function getOpenid(params) {
  return request({
    url: '/check/getOpenid',
    method: 'get',
    params
  })
}



//获取用户列表
export function getUserInfo(params) {
  return request({
    url: '/check/list',
    method: 'get',
    params
  })
}

//注册用户
export function createUser(data) {
  return request({
    url: '/check/createUser',
    method: 'post',
    data
  })
}

