<template>
    <div>
      <h3>
        本页面演示父子组件通信
      </h3>
      <el-input v-model="form.message">发送给子组件的内容</el-input>
      <my-component type="info" :msg="form.message"
                    @getChildContent="showChildContent"
                    @getChildContent2="showChildContent2"
      >获取子组件内容</my-component>
    </div>
</template>

<script>
  import MyComponent from '@/components/child/myComponent'

    export default {
      name: "ChildComponent1",
      components: {
        MyComponent
      },
      data() {
        return {
          form: {
            message: ''
          }
        }
      },
      methods: {
        showChildContent(cont){
          this.$notify.success(cont)
        },
        showChildContent2(cont){
          this.$notify.success('第二个事件监听')
        }
      }
    }
</script>

<style scoped>

</style>
