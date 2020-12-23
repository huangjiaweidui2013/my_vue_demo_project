<template>
  <div class="hello">
    <el-dialog title="添加用户信息" :visible.sync="dialogAdd.show">
      <el-form :model="formDate" ref="formdong" label-width="100px" :rules="formrules">
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="formDate.date"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formDate.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formDate.email"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formDate.title"></el-input>
        </el-form-item>
        <el-form-item label="评价" prop="evaluate">
          <el-input v-model="formDate.evaluate"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-input v-model="formDate.state"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAdd.show = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormAdd('formdong')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'AddUserInfo',
    props:{
      dialogAdd:Object
    },
    data () {
      return {
        formDate:{
          date:'',
          name:'',
          email:'',
          title:'',
          evaluate:'',
          state:''
        },
        formrules:{
          date:[{required:true,message:"日期不能为空",trigger:"blur"}],
          name:[{required:true,message:"用户名不能为空",trigger:"blur"}],
          email:[{required:true,message:"邮箱不能为空",trigger:"blur"}],
        }
      }
    },
    methods:{
      dialogFormAdd(formdong) {
        this.$refs[formdong].validate((valid) => {
          if (valid) {
            this.$axios.post('http://localhost:3000/data',this.formDate).then(res => {
              this.$message({
                type:"success",
                message:"添加信息成功"
              })
              this.dialogAdd.show = false;
              this.$emit('update');

            })
            this.formDate  = ""
          } else {
            console.log('error submit!!');
            return false;
          }
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
