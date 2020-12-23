<template>
  <div>
    <el-row :span="24">
      <el-col :span="24">
        <div ref="chinaMapDiv" style="height: 490px;"></div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6" :offset="18">
        <el-button type="primary" size="medium" icon="el-icon-back" @click="returnListPage">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import 'echarts/map/js/china'
  import {countStudentsHome} from '@/api/school/student'

  // 引入echarts图表的主题文件
  import 'echarts/theme/macarons'
 const option = {
    title : {
      text: '学生户籍分布',
      subtext: '各省份人数（个）',
      x:'center'
    },
    tooltip : {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      x:'left',
      data:['学生人数(个)']
    },
    dataRange: {
      min: 0,
      max: 100,
      x: 'left',
      y: 'bottom',
      text:['高','低'],           // 文本，默认为数值文本
      calculable : true,
      color: ['#2b92e0', '#F0F8FF']
    },
    toolbox: {
      show: true,
      orient : 'vertical',
      x: 'right',
      y: 'center',
      feature : {
        mark : {show: true},
        dataView : {show: true, readOnly: false},
        restore : {show: true},
        saveAsImage : {show: true}
      }
    },
    series : [
      {
        name: '学生人数(个)',
        type: 'map',
        mapType: 'china',
        roam: true, // 是否开启滚轮缩放
        itemStyle:{
          normal:{label:{show:true}},
          emphasis:{label:{show:true}}
        },
        data:[
          {name: '北京',value: Math.round(Math.random()*1000)},
          {name: '天津',value: Math.round(Math.random()*1000)},
          {name: '上海',value: Math.round(Math.random()*1000)},
          {name: '重庆',value: Math.round(Math.random()*1000)},
          {name: '河北',value: Math.round(Math.random()*1000)},
          {name: '河南',value: Math.round(Math.random()*1000)},
          {name: '云南',value: Math.round(Math.random()*1000)},
          {name: '辽宁',value: Math.round(Math.random()*1000)},
          {name: '黑龙江',value: Math.round(Math.random()*1000)},
          {name: '湖南',value: Math.round(Math.random()*1000)},
          {name: '安徽',value: Math.round(Math.random()*1000)},
          {name: '山东',value: Math.round(Math.random()*1000)},
          {name: '新疆',value: Math.round(Math.random()*1000)},
          {name: '江苏',value: Math.round(Math.random()*1000)},
          {name: '浙江',value: Math.round(Math.random()*1000)},
          {name: '江西',value: Math.round(Math.random()*1000)},
          {name: '湖北',value: Math.round(Math.random()*1000)},
          {name: '广西',value: Math.round(Math.random()*1000)},
          {name: '甘肃',value: Math.round(Math.random()*1000)},
          {name: '山西',value: Math.round(Math.random()*1000)},
          {name: '内蒙古',value: Math.round(Math.random()*1000)},
          {name: '陕西',value: Math.round(Math.random()*1000)},
          {name: '吉林',value: Math.round(Math.random()*1000)},
          {name: '福建',value: Math.round(Math.random()*1000)},
          {name: '贵州',value: Math.round(Math.random()*1000)},
          {name: '广东',value: Math.round(Math.random()*1000)},
          {name: '青海',value: Math.round(Math.random()*1000)},
          {name: '西藏',value: Math.round(Math.random()*1000)},
          {name: '四川',value: Math.round(Math.random()*1000)},
          {name: '宁夏',value: Math.round(Math.random()*1000)},
          {name: '海南',value: Math.round(Math.random()*1000)},
          {name: '台湾',value: Math.round(Math.random()*1000)},
          {name: '香港',value: Math.round(Math.random()*1000)},
          {name: '澳门',value: Math.round(Math.random()*1000)}
        ]
      }
    ]
  };

  export default {
    name: "StudentsHomeMap",
    data() {
      return {
        myOption : option
      }
    },
    created() {
      console.log(`接受消息: ${this.$route.query.time}`)
      // console.log(`接受消息: ${this.$route.params.msg}`)
    },
    mounted() {
      this.countStudentsHomeMap();
    },
    // 被包含在 <keep-alive> 中创建的组件，会多出两个生命周期的钩子: activated 与 deactivated
    // activated：在组件被激活时调用，在组件第一次渲染时也会被调用，之后每次keep-alive激活时被调用。
    // 当引入keep-alive 的时候，页面第一次进入，钩子的触发顺序created-> mounted-> activated，退出时触发deactivated。当再次进入（前进或者后退）时，只触发activated。
    activated(){
      this.countStudentsHomeMap();
    },
    methods: {
      returnListPage(){
        window.history.length > 1? this.$router.go(-1): this.$router.push('/');
      },
      countStudentsHomeMap(){
        console.log("调用方法,获取地图数据!" + new Date().getTime());
        countStudentsHome().then((response) => {
          let myChart = this.$echarts.init(this.$refs.chinaMapDiv, 'macarons');
          this.$message.success(response.data.data);
          let list = response.data.list;
          this.myOption.dataRange.max  = response.data.max;
          this.myOption.series[0].data = list;
          myChart.setOption(this.myOption);
        });
      }
    }
  }
</script>

<style scoped>

</style>
