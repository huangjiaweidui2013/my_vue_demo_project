<template>
  <el-container>
    <el-header style="background-color: #409EFF;height: 40px;">
      <el-row :gutter="20">
        <el-col :span="6">
          <div></div>
        </el-col>
        <el-col :span="6">
          <div></div>
        </el-col>
        <el-col :span="6">
          <div></div>
        </el-col>
        <el-col :span="4" :offset="20" style="text-align: right;">
          <el-dropdown @command="dropDownClick">
            <el-button type="primary">
              <span class="iconfont icon-shezhi"></span>
              <span style="font-weight: bold;font-size: large;">MENU</span>
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="el-dropdown-menu-item" command="firstPage">
                <router-link :to="{name: 'FirstPage'}">首页</router-link>
              </el-dropdown-item>
              <el-dropdown-item class="el-dropdown-menu-item" command="passwordModify">修改密码</el-dropdown-item>
              <el-dropdown-item class="el-dropdown-menu-item" command="exitSystem">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside style="background-color: antiquewhite;text-align: left;width: 150px;">
        <el-menu :default-active="$route.path" router>
          <el-menu-item
            v-for="menu in menus"
            :index="menu.route"
            :key="menu.route"
          >
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-qitatongyong"></use>
            </svg>
            {{menu.name}}
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div>
          <el-tabs style="border-bottom: none;height: 39px;"
            v-model="activeIndex"
            closable
            @tab-click="tabClick"
            v-if="options.length"
            @tab-remove="tabRemove">
            <el-tab-pane
              v-for="(item) in options"
              :key="item.name"
              :label="item.name"
              :name="item.route">
            </el-tab-pane>
          </el-tabs>
        </div>
        <div class="content-wrap">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </div>
      </el-main>
    </el-container>
    <el-footer style="height: 25px;">
      <span style="font-weight: bold;font-size: small;font-style: italic;">
        @一个菜鸡程序员制作,欢迎仿冒
      </span>
    </el-footer>
    <el-dialog title="修改密码" :visible.sync="isShow" width="30%">
      <el-form :model="form">
        <el-form-item label="原密码:" :label-width="formLabelWidth">
          <el-input v-model="form.originalPassword" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码:" :label-width="formLabelWidth">
          <el-input v-model="form.newPassword1" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码:" :label-width="formLabelWidth">
          <el-input v-model="form.newPassword2" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="verifyAccount">确定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>

  // 首页路由地址
  const FirstPagePath = '/ElementUITabs/StudentsMock';
  export default {
    name: "ElementUITabs",
    data() {
      return {
        isShow: false,
        formLabelWidth: '120px',
        form: {
          originalPassword: '',
          newPassword1: '',
          newPassword2: ''
        },
        menus: [
          {route: '/ElementUITabs/StudentsMock', name: '学生信息'},
          {route: '/ElementUITabs/ChinaMap', name: '学生分布'},
          {route: '/ElementUITabs/WeatherInfo', name: '实时天气'},
          {route: '/ElementUITabs/NeteaseNews', name: '网易新闻'},
          {route: '/ElementUITabs/VuexDemo', name: 'Vuex演示'},
          {route: '/ElementUITabs/ShoppingCart', name: 'Vuex购物车'},
          {route: '/ElementUITabs/ChildComponent1', name: '富文本UEditor'},
          {route: '/ElementUITabs/ChildComponent2', name: '父子组件通信'},
          {route: '/ElementUITabs/ElementUIOthers', name: 'ElementUI其他组件'},
          {route: '/ElementUITabs/Tinymce', name: 'Tinymce富文本组件'},
          {route: '/ElementUITabs/QRCodePage', name: '二维码示例'}
        ]
      }
    },
    methods: {
      // tab切换时，动态的切换路由
      tabClick(tab) {
        let path = this.activeIndex;
        this.$router.push({path: path});
      },
      tabRemove(targetName) {
        // 首页不可删除
        if (targetName == FirstPagePath) {
          return;
        }
        this.$store.dispatch('tabs/removeTabs', targetName);
        if (this.activeIndex === targetName) {
          // 设置当前激活的路由
          if (this.options && this.options.length >= 1) {
            this.$store.dispatch('tabs/setActiveIndex', this.options[this.options.length - 1].route);
            this.$router.push({path: this.activeIndex});
          } else {
            this.$router.push({path: FirstPagePath});
          }
        }
      },
      // 下拉菜单点击事件
      dropDownClick(command){
        if (command == "passwordModify"){
          this.isShow = true;
        }
        if (command == "exitSystem"){
          this.$router.push("/login");
        }
      },
      // 修改账号密码校验
      verifyAccount(){
        let curAccount = this.$store.dispatch('accounts/getCurrentAccount');
        let curPassword = curAccount.currentPassword;
        if (this.form.originalPassword != curPassword){
          /*
          TODO()
           */
          this.$alert("原密码不对!");
        }
      }

    },
    mounted() {
      // 刷新时以当前路由做为tab加入tabs
      let b = true;
      for (let op of this.options) {
        if (op.route === FirstPagePath) {
          b = false;
          break;
        }
      }
      if (this.$route.path !== FirstPagePath) {
        if (b) {
          this.$store.dispatch('tabs/addTabs', {route: FirstPagePath, name: '学生信息'});
        }
        this.$store.dispatch('tabs/addTabs', {route: this.$route.path, name: this.$route.name});
        this.$store.dispatch('tabs/setActiveIndex', this.$route.path);
      } else {
        if (b) {
          this.$store.dispatch('tabs/addTabs', {route: FirstPagePath, name: '学生信息'});
          this.$store.dispatch('tabs/setActiveIndex', FirstPagePath);
          this.$router.push(FirstPagePath);
        }
      }
    },
    computed: {
      options() {
        return this.$store.state.tabs.options;
      },
      activeIndex: {
        get() {
          return this.$store.state.tabs.activeIndex;
        },
        set(val) {
          this.$store.dispatch('tabs/setActiveIndex', val);
        }
      }
    },
    watch: {
      '$route'(to) {
        let flag = false;
        for (let option of this.options) {
          if (option.name === to.name) {
            flag = true;
            this.$store.dispatch('tabs/setActiveIndex', to.path);
            break;
          }
        }
        if (!flag) {
          this.$store.dispatch('tabs/addTabs', {route: to.path, name: to.name});
          this.$store.dispatch('tabs/setActiveIndex', to.path);
        }
      }

    }
  }
</script>

<style scoped>
  .content-wrap {
    height: 560px;
    border: 1px solid #d1dbe5;
    border-top: none;
    padding: 10px 10px;
  }
  .el-dropdown-menu-item {
    text-align: left;
    width: 90px;
  }
</style>
