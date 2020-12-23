import Mock from 'mockjs'
import LOCALSTORAGE from '../../store/localStorage'

let StudentsList = LOCALSTORAGE.getItemFromLocalStorage('StudentsList') || [];

// 生成数据数量
const num = 100;

//如果不采用默认导出,需要在前面加上export关键字,如: export constVar HomeAddr = [...]
const HomeAddr = ['北京市', '天津市', '上海市', '重庆市', '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省', '江苏省', '浙江省', '安徽省',
  '福建省', '江西省', '山东省', '河南省', '湖北省', '湖南省', '广东省', '海南省', '四川省', '贵州省', '云南省', '陕西省',
  '甘肃省', '青海省', '台湾省', '内蒙古自治区', '广西壮族自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区'];
const HomeAddrSimple = ['北京', '天津', '上海', '重庆', '河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东',
  '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西',
  '甘肃', '青海', '台湾', '内蒙古', '广西', '西藏', '宁夏', '新疆', '香港', '澳门'];
const HobbyArr = ['篮球', '足球', '游泳', '攀岩', '阅读', '滑板'];
const GradeArr = ['高一', '高二', '高三'];
const ClassArr = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

//先清空所有
// LOCALSTORAGE.removeItemFromLocalStorage('StudentsList');
const Random = Mock.Random;
function SetStudentsList() {
  if (StudentsList == null || StudentsList.length < 1) {
    console.log("StudentsList开始初始化插入数据...");
    StudentsList = new Array();
    for (let i = 0; i < num; i++) {
      StudentsList.push(Mock.mock(
        {
          'id': Random.id(), // id每次随机生成18位数字
          'home|1': HomeAddr,// 每次随机取其中一个
          // 'name|1': ['毕夏', '华筝', '刘明', '曹雪', '魏翔', '王志', '夏雨'],
          'name': Random.cname(),
          'sex|1': ['男', '女'],
          'age|1': [16, 17, 18],
          'grade|1': GradeArr,
          'class|1': ClassArr,
          'hobby|1': HobbyArr,
          'scores': {
            'chinese|1-100': 100,
            'math|1-100': 100,
            'english|1-100': 100,
            'physics|1-100': 100,
            'chemistry|1-100': 100,
            'biology|1-100': 100
          },
          'status': false
        }
      ))
    }
    LOCALSTORAGE.setItemToLocalStorage('StudentsList', StudentsList)
  }
}

/**
 * 1.export与export default均可用于导出常量、函数、文件、模块等
 2.在一个文件或模块中，export  、import可以有多个，export default仅有一个
 3.通过export方式导出，在import导入时要加{ }，export default则不能
 4.export能直接导出变量表达式，export default不行
 */
export default {
  HomeAddr,
  GradeArr,
  ClassArr,
  // 下面是增删改查方法的返回，和后台约定好之后就会省很多事
  // get
  getAllStudents: (param) => {
    StudentsList = LOCALSTORAGE.getItemFromLocalStorage('StudentsList');
    let data = [];
    if (!StudentsList) {
      SetStudentsList();
    }
    let len = StudentsList.length;
    let page = JSON.parse(param.body).page;
    let rows = JSON.parse(param.body).rows;

    console.log(`page: ${page} , rows: ${rows}`);
    if (len > page * rows) {
      data = StudentsList.slice((page - 1) * rows, page * rows)
    } else {
      data = StudentsList.slice((page - 1) * rows)
    }
    return {
      total: StudentsList.length,
      data: data
    }
  },
  // add
  addStudents: (param) => {
    let students = LOCALSTORAGE.getItemFromLocalStorage('StudentsList');
    console.log(`开始新增操作前的列表长度: ${students.length}`);
    let stu = JSON.parse(param.body);
    if (!stu.id) {
      stu['id'] = Random.id()
    }
    students.push(stu);
    LOCALSTORAGE.setItemToLocalStorage('StudentsList', students);
    let students2 = LOCALSTORAGE.getItemFromLocalStorage('StudentsList');
    console.log(`完成新增操作后的列表长度: ${students2.length}`);
    return {
      resultCode: 200,
      data: 'success'
    }
  },
  // edit
  editStudents: (param) => {
    let students = LOCALSTORAGE.getItemFromLocalStorage('StudentsList');
    let stu = JSON.parse(param.body);
    let id = stu.id;
    if (id) {
      students.splice(students.findIndex(item => item.id === id), 1, stu);
    }
    LOCALSTORAGE.setItemToLocalStorage('StudentsList', students);
    return {
      resultCode: 200,
      data: 'success'
    }
  },
  // delete
  delStudents: (param) => {
    let students = LOCALSTORAGE.getItemFromLocalStorage('StudentsList');
    console.log(`开始删除操作前的列表长度: ${students.length}`);
    // let id = JSON.parse(param.body.toString());
    let id = param.body;
    if (id) {
      // es6 删除数组指定元素
      /*  arr.splice(arr.findIndex(item => item.id === id), 1)
      item 只是参数可以写成 i 或者 v 都可以 ，
      后面的额id是数组的id，是不能随便写的，如果你数组里面写的是id，这里就写id，如果数组里面写的是num，那这里就写num ，
      === 后面的id是你想要删除的元素的id号，同理，如果你数组里面写的是num，那这里就是num号 ，
      1是你要删除1个元素的意思 */
      students.splice(students.findIndex(item => item.id === id), 1);
    }
    LOCALSTORAGE.setItemToLocalStorage('StudentsList', students);
    let students2 = LOCALSTORAGE.getItemFromLocalStorage('StudentsList');
    console.log(`完成删除操作后的列表长度: ${students2.length}`);
    return {
      resultCode: 200,
      data: 'success'
    }
  },
  //计算每个省份有多少学生
  countStudentsHomeNum: () => {
    let students = LOCALSTORAGE.getItemFromLocalStorage('StudentsList');
    let map = new Map();
    let results = [];
    for (let i = 0; i < HomeAddrSimple.length; i++) {
      map.set(HomeAddrSimple[i], 0);
    }
    for (let i = 0; i < students.length; i++) {
      let stu = students[i];
      let h = stu.home;
      let ind = HomeAddr.findIndex(item => item === h);
      let tmpK = HomeAddrSimple[ind];
      map.set(tmpK, map.get(tmpK) + 1);
    }
    let max = 0;
    for (let [key, value] of map) {
      results.push({'name': key, 'value': value});
      if (value > max){
        max = value;
      }
    }
    return {
      resultCode: 200,
      data: '统计学生户籍分布数量成功!',
      list: results,
      max: max
    }
  }
}
