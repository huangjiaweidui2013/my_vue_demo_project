<template>
  <div>
    <div style="margin-bottom: 20px;text-align: left;">
      <span style="font-size: large;font-weight: bold;color: #00a0e9;">百度开源富文本编辑器UEditor</span>
      <a href="http://ueditor.baidu.com/doc/" style="margin-left: 20px;font-style: italic;">http://ueditor.baidu.com/doc/</a>
    </div>
    <Ueditor :value="ueditor.value" :config="ueditor.config" ref="ue"></Ueditor>
    <el-button type="primary" @click="getUEditorContent">获取富文本编辑器内容</el-button>
    <el-input type="textarea" v-model="dat.content"></el-input>
  </div>
</template>

<script>
  import Ueditor from '@/components/ue'

  export default {
    name: "ChildComponent1",
    components: {Ueditor},
    data() {
      return {
        dat: {
          content: ''
        },
        ueditor: {
          value: '富文本编辑器默认显示文字',
          config: {
            initialFrameWidth: '100%',
            initialFrameHeight: 300
          }
        }
      }
    },
    methods: {
      getUEditorContent(){

        this.dat.content = this.$refs.ue.getUEContent();
        this.ueditor.value = this.dat.content;
        
      }
    }
  }
</script>

<style scoped>

</style>
