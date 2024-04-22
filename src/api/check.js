
import request from '@/utils/request'

//以下接口仅用于测试微信小程序的部分接口
//用户模块
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


//打卡模块
//获取用户的打卡记录
export function checkList(params) {
  return request({
    url: '/check/checkList',
    method: 'get',
    params
  })
}

//打卡
export function createCheck(data) {
  return request({
    url: '/check/createCheck',
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

