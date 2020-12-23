import axios from 'axios'

// 列表
export function getStudentsList(param){
  console.log(param)
  return axios({
    url: '/school/get',
    method: 'get',
    data: param
  })
}

// 修改
export function updateStudentsList(param){
  return axios({
    url: '/school/eit',
    method: 'put',
    data: param
  })
}

// 添加
export function addStudentsList(param){
  return axios({
    url: '/school/add',
    method: 'put',
    data: param
  })
}

// 删除
export function delStudentsList(param){
  return axios({
    url: '/school/del',
    method: 'post',
    data: param
  })
}

// 计算每个省份有多少学生
export function countStudentsHome(param){
  return axios({
    url: '/school/count',
    method: 'get',
    data: param
  })
}
