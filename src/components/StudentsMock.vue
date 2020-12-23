<template>
  <div>
    <el-form ref="form" :model="form" label-width="100px" size="small">
      <el-row>
        <el-col>
          <el-form-item label="学生姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入学生姓名..."></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-radio-group v-model="form.age">
              <el-radio :label="16">16周岁</el-radio>
              <el-radio :label="17">17周岁</el-radio>
              <el-radio :label="18">18周岁</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别...">
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="年级" prop="grade">
            <el-radio-group v-model="form.grade" placeholder="请选择年级...">
              <el-radio v-for="(item, index) in constVar.grades" :key="index" :label="item" :value="item">{{item}}
              </el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="班级" prop="class">
            <el-select v-model="form.class" placeholder="请选择班级...">
              <el-option v-for="(item, index) in constVar.classes" :key="index" :label="item" :value="item">{{item}}班
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="户籍" prop="home">
            <el-select v-model="form.home" placeholder="请选择户籍地...">
              <el-option v-for="(item, index) in constVar.homes" :key="index" :label="item" :value="item">{{item}}
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="业余爱好" prop="hobby">
            <el-input v-model="form.hobby" placeholder="请输入业余爱好..."></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-form-item>
            <el-button type="primary" icon="el-icon-plus" @click="submitForm">创建</el-button>
            <el-button type="info" icon="el-icon-close" @click="resetForm">取消</el-button>
            <el-button type="primary" icon="el-icon-search" @click="findStudentsList">搜索</el-button>
            <el-button type="primary" icon="el-icon-upload el-icon--right" @click="jumpToChinaMapPage">地图</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- <div style="float: right;width: 100%;height: 50px;text-align: right;margin-right: 50px;">
       <el-tooltip class="item" effect="dark" content="点击查看学生户籍分布图" placement="right">
         <svg class="icon" aria-hidden="true" style="width: 50px;height: 100%;cursor: pointer;" @click="jumpToChinaMapPage">
           <use xlink:href="#icon-chuchashenqing"></use>
         </svg>
       </el-tooltip>
     </div>-->
    <!--下面是数据表格-->
    <el-table :data="students" height="300" border highlight-current-row @cell-click="tableCellClickFunc">
      <el-table-column type="index" :index="rowNumMethod" label="行号">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
        <template slot-scope="scope">
          <el-input v-if="scope.row.status" v-model="scope.row.name" placeholder="请输入学生姓名..."></el-input>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sex" label="性别" sortable>
        <template slot-scope="scope">
          <el-select v-if="scope.row.status" v-model="scope.row.sex" placeholder="请选择性别...">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
          <span v-else>{{scope.row.sex}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="年龄" sortable>
        <template slot-scope="scope">
          <el-radio-group v-if="scope.row.status" v-model="scope.row.age">
            <el-radio :label="16">16周岁</el-radio>
            <el-radio :label="17">17周岁</el-radio>
            <el-radio :label="18">18周岁</el-radio>
          </el-radio-group>
          <span v-else>{{scope.row.age}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="grade" label="年级" sortable>
        <template slot-scope="scope">
          <el-radio-group v-if="scope.row.status" v-model="scope.row.grade" placeholder="请选择年级...">
            <el-radio v-for="(item, index) in constVar.grades" :key="index" :label="item" :value="item">{{item}}
            </el-radio>
          </el-radio-group>
          <span v-else>{{scope.row.grade}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="class" label="班级" sortable>
        <template slot-scope="scope">
          <el-select v-if="scope.row.status" v-model="scope.row.class" placeholder="请选择班级...">
            <el-option v-for="(item, index) in constVar.classes" :key="index" :label="item" :value="item">{{item}}班
            </el-option>
          </el-select>
          <span v-else>{{scope.row.class}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="hobby" label="业余爱好">
        <template slot-scope="scope">
          <el-input v-if="scope.row.status" v-model="scope.row.hobby" placeholder="请输入业余爱好..."></el-input>
          <span v-else>{{scope.row.hobby}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="home" label="户籍" sortable>
        <template slot-scope="scope">
          <el-select v-if="scope.row.status" v-model="scope.row.home" placeholder="请选择户籍地...">
            <el-option v-for="(item, index) in constVar.homes" :key="index" :label="item" :value="item">{{item}}
            </el-option>
          </el-select>
          <span v-else>{{scope.row.home}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <el-button type="success" size="mini" icon="el-icon-edit"
                     @click="handleEdit(scope.$index, scope.row, $event)">{{scope.row.status? '取消':'编辑'}}
          </el-button>
          <el-button v-if="scope.row.status" type="primary" size="mini" icon="el-icon-success"
                     @click="handleEditSubmit(scope.$index, scope.row)">
            保存
          </el-button>
          <el-button type="warning" size="mini" icon="el-icon-delete" @click="handleDelete(scope.$index, scope.row)">
            删除
          </el-button>
          <el-button type="info" size="mini" icon="el-icon-document" @click="showDialog(scope.$index, scope.row)">
            成绩
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="form.page" :page-sizes="pagination.pageSizes"
                   :page-size="form.rows"
                   layout="sizes, prev, pager, next, jumper, total" :total="pagination.total">

    </el-pagination>
    <el-dialog id="dialogChartDialog" title="各科成绩" :visible.sync="dialogVisible" width="50%">
      <div ref="dialogChartDiv" style="width: 100%;height: 300px;"></div>
      <span slot="footer">
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  /**
   * // 全部导入
   import people from './example'
   // 将整个模块当作单一对象进行导入，该模块的所有导出都会作为对象的属性存在
   import * as example from "./example.js"
   console.log(example.name)
   console.log(example.getName())
   // 导入部分，引入非 default 时，使用花括号
   import {name, age} from './example'
   // 导出默认, 有且只有一个默认
   export default App
   // 部分导出
   export class App extend Component {}
   */

  // 导入的不是default export,因此必须加上{}
  import {getStudentsList, updateStudentsList, addStudentsList, delStudentsList} from '@/api/school/student'
  // import {HomeAddr,GradeArr,classes} from '@/mock/school/student'

  // 导入的是默认导出export default,因此不能加{}
  import constStu from '@/mock/school/student'

  // 引入echarts图表的主题文件
  import 'echarts/theme/macarons'

  //echarts option
  const common_option = {
    title: {
      text: '该学生各科成绩分布',
      subtext: '理科六门课程',
      x: 'center'
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        magicType: {show: true, type: ['line', 'bar']},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      data: [],
      axisLabel: {
        inside: false,
        textStyle: {
          color: '#2ec7c9'
        }
      },
      axisTick: {
        show: true
      },
      axisLine: {
        show: true
      },
      z: 10
    },
    yAxis: {
      name: '分数(分)',
      axisLine: {
        show: true
      },
      axisTick: {
        show: true
      },
      axisLabel: {
        textStyle: {
          color: '#999'
        }
      }
    },
    dataZoom: [
      {
        type: 'inside'
      }
    ],
    series: [
      // { // For shadow
      //   type: 'bar',
      //   itemStyle: {
      //     normal: {color: 'rgba(0,0,0,0.05)'}
      //   },
      //   barGap:'-100%',
      //   barCategoryGap:'40%',
      //   data: [],
      //   animation: false
      // },
      {
        barMaxWidth: 50,
        type: 'bar',
        data: [],
        markPoint: {
          data: [
            {type: 'max', name: '最大值'},
            {type: 'min', name: '最小值'}
          ]
        },
        markLine: {
          data: [
            {type: 'average', name: '平均值'}
          ]
        }
      }
    ]
  };

  export default {
    name: "StudentsMock",
    data() {
      return {
        pagination: {
          pageSizes: [5, 10, 20, 50],
          total: 10
        },
        dialogVisible: false,
        form: {
          name: '',
          sex: '',
          age: '',
          grade: '',
          class: '',
          hobby: '',
          home: '',
          page: 1,
          rows: 5,
          status: false
        },
        constVar: {
          homes: constStu.HomeAddr,
          grades: constStu.GradeArr,
          classes: constStu.ClassArr
        },
        students: [
          {
            id: '',
            name: '',
            sex: '',
            age: '',
            grade: '',
            class: '',
            hobby: '',
            home: '',
            scores: {
              chinese: 0,
              math: 0,
              english: 0,
              physics: 0,
              chemistry: 0,
              biology: 0
            },
            status: false
          }
        ]
      }
    },
    // computed:{
    //   grades: function () {
    //     console.log(GradeArr)
    //     return GradeArr
    //   }
    // },
    mounted() {
      this.findStudentsList();
    },
    methods: {
      jumpToChinaMapPage() {
        let now = new Date();
        let pa = this.$route.path;
        let newPath = pa.replace("StudentsMock", "ChinaMap");
        this.$router.push({
          path: newPath,
          query: {
            time: now.getFullYear() + "" + (now.getMonth() + 1 < 10 ? "0" + (now.getMonth() + 1) : (now.getMonth() + 1)) + (now.getDay() < 10 ? "0" + now.getDay() : now.getDay())
          }
        });

        // this.$router.push({
        //   name: 'ChinaMap',
        //   params: {
        //     'msg': '由学生信息页面传送的消息!'
        //   }
        // })
      },
      submitForm() {
        // JS中的对象展开运算符“...”
        let stu = {...this.form};
        delete stu.page;
        delete stu.rows;
        console.log('stu: ' + JSON.stringify(stu));
        addStudentsList(stu).then((response) => {
          this.$message.success(response.data.data);
          this.findStudentsList()
        });
      },
      resetForm() {
        // 使用this.$ref['form'] .resetFields()无法重置表单项,原因: 1.没有给表单添加ref属性 <el-form ref="form"></el-form>
        // 2.表单项el-form-item没有添加prop属性，prop属性需要与input框绑定的属性一致
        this.$refs['form'].resetFields()
      },
      // size-change	pageSize 改变时会触发	每页条数size
      handleSizeChange(val) {
        console.log(`每页 ${val}条`);
        this.form.rows = val;
        this.findStudentsList()
      },
      // current-change	currentPage 改变时会触发	当前页currentPage
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.form.page = val;
        this.findStudentsList()
      },
      findStudentsList() {
        getStudentsList(this.form).then((response) => {
          // for (let i=0;i<response.data.data.length;i++){
          //   response.data.data[i]['status'] = true
          // }
          // console.log('查询结果:' + JSON.stringify(response.data.data));
          this.students = response.data.data;
          this.pagination.total = response.data.total
        });
      },
      handleEdit(index, row, event) {
        // console.log(`edit index: ${index}, row: ${JSON.stringify(row)}`)
        // console.log(event);
        // console.log(`tagName: ${JSON.stringify(event.target.tagName)}`)
        // console.log(`innerText: ${JSON.stringify(event.target.innerText)}`)
        let that = this;
        let origin_status = that.students[index].status;
        // if (!origin_status){
        //   event.target.innerText = '取消'
        // } else{
        //   event.target.innerText = '编辑'
        // }

        this.$nextTick(() => {
          this.students[index].status = !origin_status
        })
      },
      handleEditSubmit(index, row) {
        console.log(`edit index: ${index}, row: ${JSON.stringify(row)}`);
        row.status = false;
        updateStudentsList(row).then((response) => {
          this.$message.success(response.data.data);
          this.findStudentsList();
        })
      },
      handleDelete(index, row) {
        console.log(`delete index: ${index}, row: ${JSON.stringify(row)}`);
        delStudentsList(row.id).then((response) => {
          this.$message.success(response.data.data);
          this.findStudentsList()
        })
      },
      rowNumMethod(index) {
        return index + 1
      },
      tableCellClickFunc(row, column, cell, event) {
        let id = row.id;
        let page = this.form.page;
        let rows = this.form.rows;
        this.form = this.students.find(item => item.id === id);
        this.form.page = page;
        this.form.rows = rows;
      },
      showDialog(index, row) {
        this.dialogVisible = true;
        this.$nextTick(() => {
          //初始化echarts实例
          let myChart = this.$echarts.init(this.$refs['dialogChartDiv'], 'macarons');
          console.log(document.getElementById('dialogChartDialog'));
          console.log(this.$refs['dialogChartDiv']);
          let option = common_option;
          let scores = this.students[index].scores;
          let xAxisArray = [];
          let yAxisArray = [];
          for (let k in scores) {
            xAxisArray.push(k);
            yAxisArray.push(scores[k]);
          }
          option.xAxis.data = xAxisArray;
          option.series[0].data = yAxisArray;
          myChart.setOption(option);
        })

      }
    }
  }

</script>

<style scoped>

</style>
