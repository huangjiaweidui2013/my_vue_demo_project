import Mock from 'mockjs'
import studentMock from './school/student'

// 接口里的地址  请求方式 mock中对应的返回
Mock.mock('/school/get', 'get', studentMock.getAllStudents);
Mock.mock('/school/eit', 'put', studentMock.editStudents);
Mock.mock('/school/add', 'put', studentMock.addStudents);
Mock.mock('/school/del', 'post', studentMock.delStudents);
Mock.mock('/school/count', 'get', studentMock.countStudentsHomeNum);
