<template>
  <div>
    <h4>这是子组件,用于演示父子组件通信</h4>
    <el-form :model="form" label-width="80px">
      <el-row>
        <el-col>
          <el-form-item label="父组件发送的内容" prop="msg">
            <el-input v-model="msg"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="子组件内容" prop="content">
            <el-input v-model="form.content"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-button type="primary" @click="sendContent">发送内容</el-button>
          <el-button type="primary" @click="sendContent2">发送内容2</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
    export default {
      name: "myComponent",
      props: {
        msg: {
          type: String,
          default: () => {return '子组件的msg属性默认值'}
        }
      },
      data() {
        return {
          form: {
            content: ''
          }
        }
      },
      methods: {
        sendContent() {
          this.$emit('getChildContent', this.form.content)
        },
        sendContent2() {
          this.$emit('getChildContent2', this.form.content)
        }
      }
    }
</script>

<style scoped>

</style>
