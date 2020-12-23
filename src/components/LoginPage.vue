<template>
  <div class="backgroundClass">
    <!--引用图片的方式之一-->
    <!--<img class="card" src="~@/assets/images/technology.png" ></img>-->
    <el-card style="width: 500px;margin: 0 auto;position: absolute;top: 50%;left: 40%;transform: translate(60%, -50%);">
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label">
            <span class="iconfont icon-wodejuhuasuan"></span> 登录
          </span>
          <div>
            <div style="display: inline;">
              <span>用户</span>
            </div>
            <div style="border: 1px solid #DCDFE6;line-height: 32px;border-radius: 3px;width: 192px;display: inline-block;">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-zhuanzhengshenqing"></use>
              </svg>
              <input type="text" style="border: none;line-height: 30px;" v-model="form.username" @keyup.enter="loginFunc"></input>
            </div>
          </div>
          <div style="margin-top: 20px;margin-bottom: 20px;">
            <div style="display: inline;">
              <span>密码</span>
            </div>
            <div style="border: 1px solid #DCDFE6;line-height: 32px;border-radius: 3px;width: 192px;display: inline-block;">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jianglidan"></use>
              </svg>
              <input type="password" style="border: none;line-height: 30px;" v-model="form.password" @keyup.enter="loginFunc"></input>
            </div>
          </div>
          <el-form ref="loginForm" :model="form" label-width="80px" @submit.native.prevent>
            <el-row>
              <el-col>
                <el-form-item>
                  <el-button type="primary" @click="loginFunc">
                    登录
                  </el-button>
                  <el-button @click="cancelFunc">
                    取消
                  </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
        <el-tab-pane>
          <span slot="label">
            <span class="iconfont icon-liwu"></span> 注册
          </span>
          <el-form status-icon :model="register" :rules="registerRules" ref="registerForm" label-width="80px">
            <el-row>
              <el-col>
                <el-form-item label="真实姓名" prop="realName" required>
                  <el-input v-model="register.realName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="sex" label="性别" required>
                  <el-select v-model="register.sex" placeholder="选择性别">
                    <el-option label="男" value="男"></el-option>
                    <el-option label="女" value="女"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="age" label="年龄" required>
                  <el-input-number v-model="register.age"></el-input-number>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="birthday" label="生日" required>
                  <el-date-picker type="date" placeholder="选择日期" v-model="register.birthday"
                                  :picker-options="expectDateOption" value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="home" label="户籍" required>
                  <el-select v-model="register.home" placeholder="请选择户籍地...">
                    <el-option v-for="(item, index) in constVar.homes" :key="index" :label="item" :value="item">{{item}}
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="账号" prop="userName" required>
                  <el-input v-model="register.userName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="密码" prop="pass" required>
                  <el-input type="password" v-model="register.pass"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="确认密码" prop="checkPass" required>
                  <el-input type="password" v-model="register.checkPass"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item>
                  <el-button type="primary" @click="registerAndLogin">注册并登陆</el-button>
                  <el-button @click="resetForm">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
  import {mapState, mapGetters, mapMutations, mapActions} from 'vuex'
  // 导入的是默认导出export default,因此不能加{}
  import constStu from '@/mock/school/student'

  export default {
    name: "LoginPage",
    data() {
      // 自定义字段校验
      var checkAge = (rule, value, callback) => {
        if (!value){
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)){
            callback(new Error('年龄必须是整数'));
          } else {
            if (value < 10) {
              callback(new Error('必须年满10周岁'));
            } else if (value > 50){
              callback(new Error('年龄不能超过50周岁'));
            } else{
              callback();
            }
          }
        }, 1000);
      };

      var validatePass = (rule, value, callback) => {
        if (value === ''){
          callback(new Error('请输入密码'));
        } else {
          if (this.register.checkPass !== ''){
            this.$refs.registerForm.validateField('checkPass');
          }
          callback();
        }
      };

      var validateCheckPass = (rule, value, callback) => {
        if (value === ''){
          callback(new Error('请再次输入密码'));
        } else if (value !== this.register.pass){
          callback(new Error('两次输入密码不一致'));
        }else{
          callback();
        }
      };

      return {
        expectDateOption: {
          // 只可以选择今天以前(不包括今天)的日期
          disabledDate(date){
            return date.getTime() > Date.now() - 8.64e7; // 8.64e7=1000*60*60*24一天
          }
        },
        form: {
          username: 'admin',
          password: '123'
        },
        register: {
          userName: '',
          password: '',
          realName: '',
          accountType: 0,
          sex: '男',
          age: 18,
          birthday: '2019-10-28',
          home: '湖北',
          pass: '',
          checkPass: ''
        },
        registerRules: {
          userName: [
            {required: true, message: '请输入登陆账户', trigger: 'blur'},
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          realName: [
            {required: true, message: '请输入真实姓名', trigger: 'blur'},
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'blur'}
          ],
          age: [
            {validator: checkAge, trigger: 'blur'}
          ],
          birthday: [
            {required: true, message: '请选择生日', trigger: 'blur'}
          ],
          home: [
            {required: true, message: '请选择户籍所在地', trigger: 'blur'}
          ],
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validateCheckPass, trigger: 'blur'}
          ]
        },
        constVar: {
          homes: constStu.HomeAddr
        }
      }
    },
    computed: {
      allAccounts(){
        // vuex 模块化 获取模块中的数据的方式之一
        return this.$store.state.accounts.accounts;
      },
      // computed属性，从store 中获取状态state，不要忘记 accounts 命名空间
      ...mapState("accounts", {
        allAccounts1: state => state.accounts,
        current1: state => state.current
      }),
      accounts2(){
        return this.$store.getters["accounts/getAccounts"];
      },
      current2(){
        return this.$store.getters["accounts/getCurrent"];
      }
    },
    methods: {
      setCurrent(){
        let dat = {"currentUsername": this.form.username, "currentPassword": this.form.password};
        this.$store.dispatch("accounts/setCurrentAccount", dat);
      },
      loginFunc() {
        let ind = this.allAccounts1.findIndex(item => item.userName === this.form.username);
        if (ind > -1){
          if (this.allAccounts1[ind].password === this.form.password){
            this.setCurrent();
              this.$router.push({
                path: '/ElementUITabs'
              });
          } else{
            this.$alert('密码错误');
          }
        } else{
          this.$alert('账号不存在');
        }

        // console.log(this.allAccounts[0]);
        // console.log(this.allAccounts1[0]);
        // console.log(this.accounts2[0]);
        // console.log(this.current2.currentUsername);

      },
      cancelFunc() {
        // 使用this.$ref['form'] .resetFields()无法重置表单项,原因: 1.没有给表单添加ref属性 <el-form ref="form"></el-form>
        // 2.表单项el-form-item没有添加prop属性，prop属性需要与input框绑定的属性一致
        this.$refs['loginForm'].resetFields();

        this.form.username = '';
        this.form.password = '';
      },
      registerAndLogin() {
        this.$refs['registerForm'].validate((valid) => {
          if (valid){
            this.register.password = this.register.pass;
            this.$store.dispatch("accounts/addAccount", this.register);
            this.loginFunc();
          } else {
            this.$notify.error({
              title: '错误信息',
              message: '注册信息输入有错误,请纠正!',
              position: 'bottom-right'
            });
          }
        });
      },
      resetForm() {
        this.$refs['registerForm'].resetFields();
      }
    }
  }
</script>

<style scoped>
  .backgroundClass {
    width: 100%;
    height: 100%;
    position: absolute;
    background: url("~@/assets/images/green_leaf.jpg") center center no-repeat;
  }
</style>
