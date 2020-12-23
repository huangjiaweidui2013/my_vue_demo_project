<template>
  <el-container style="height: 100%;">
    <el-header style="height: 50px;background-color: darkgrey;">
      Header
    </el-header>

    <el-container style="height: 630px;">
      <el-aside width="200px" style="background-color: antiquewhite;text-align: left;">
        <el-menu default-active="/ElementUIMenu/StudentsMock" background-color="antiquewhite" unique-opened router>
          <el-submenu index="1">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhengzhangshenqing"></use>
              </svg>
              开源接口
            </template>
            <el-menu-item-group>
              <el-menu-item index="/ElementUIMenu/WeatherInfo">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-qitatongyong"></use>
                </svg>
                实时天气
              </el-menu-item>
              <el-menu-item index="/ElementUIMenu/NeteaseNews">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-qitatongyong"></use>
                </svg>
                网易新闻
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jixiaoziping"></use>
              </svg>
              VUEX状态管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="/ElementUIMenu/VuexDemo">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-qitatongyong"></use>
                </svg>
                VuexDemo页面
              </el-menu-item>
              <el-menu-item index="/ElementUIMenu/ShoppingCart">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-qitatongyong"></use>
                </svg>
                Vuex购物车
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhuanzhengshenqing"></use>
              </svg>
              学生信息
            </template>
            <el-menu-item-group>
              <el-menu-item index="/ElementUIMenu/StudentsMock">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-qitatongyong"></use>
                </svg>
                学生列表
              </el-menu-item>
              <el-menu-item index="/ElementUIMenu/ChinaMap">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-qitatongyong"></use>
                </svg>
                Echarts地图
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xinxibiangeng"></use>
              </svg>
              子路由应用
            </template>
            <el-menu-item-group>
              <el-menu-item index="/ElementUIMenu/ChildComponent1">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-qitatongyong"></use>
                </svg>
                第一个子路由页面
              </el-menu-item>
              <el-menu-item index="/ElementUIMenu/ChildComponent2">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-qitatongyong"></use>
                </svg>
                第二个子路由页面
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>

        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>

    </el-container>

    <el-footer style="height: 50px;background-color: darkgray;">
      Footer
    </el-footer>

  </el-container>
</template>

<script>
  export default {
    name: "ElementUIMenu",
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

</style>
