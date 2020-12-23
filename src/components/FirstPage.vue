<template>
  <el-table :data="tableData" style="width: 80%;align-content: center;" :row-class-name="tableRowClassName">
    <el-row>
      <el-table-column prop="name" label="链接名称" width="300" @click="linkToOtherPages">
        <template slot-scope="scope">
          <router-link :to="scope.row.name">{{scope.row.title}}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="addr" label="网址" width="400">
      </el-table-column>
      <el-table-column prop="desc" label="描述" width="300">
      </el-table-column>
    </el-row>
  </el-table>
</template>

<script>

  // import WeatherInfo from '@/components/WeatherInfo'
export default {
  name: 'HelloWorld',
  // components: [WeatherInfo],
  data () {
    return {
      tableData: [
        {
          title: '天气查询',
          name: 'WeatherInfo',
          addr: 'https://www.apiopen.top/weatherApi',
          desc: '开源实时天气查询'
        },
        {
          title: '网易新闻',
          name: 'NeteaseNews',
          addr: 'https://api.apiopen.top/getWangYiNews',
          desc: '网易新闻'
        },
        {
          title: 'VuexDemo页面',
          name: 'VuexDemo',
          addr: '',
          desc: '简单应用了Vuex状态管理的页面'
        },
        {
          title: 'Vuex购物车页面',
          name: 'ShoppingCart',
          addr: '',
          desc: '使用了Vuex状态管理的购物车页面'
        },
        {
          title: '学习ElementUI的导航菜单',
          name: 'ElementUIMenu',
          addr: '',
          desc: '学习ElementUI的导航菜单'
        },
        {
          title: '学习ElementUI的tab页签',
          name: 'ElementUITabs',
          addr: '',
          desc: '学习ElementUI的tab页签'
        },
        {
          title: '使用Mock.js的简单页面',
          name: 'StudentsMock',
          addr: '',
          desc: '学习使用Moc.js,结合axios模仿请求数据'
        }
      ]
    }
  },
  methods: {
    linkToOtherPages(){

    },
    tableRowClassName(row, rowIndex){
      if (rowIndex%2 === 1){
        return 'warning-row'
      } else{
        return 'success-row'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-table .warning-row {
    background: coral;
  }

  .el-table .success-row {
    background: #2c3e50;
  }

</style>
