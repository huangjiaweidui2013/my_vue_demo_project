<template>
  <div class="tinymce">
    <h1>tinymce</h1>
    <editor id="tinymce" v-model="tinymceHtml" :init="init"></editor>
    <div style="width: 100%;margin: 10px 0;text-align: left;">
      <span style="color: blue;">富文本框中的内容:</span>
    </div>
    <div v-html="tinymceHtml" style="white-space: pre-wrap;word-wrap: break-word;"></div>
  </div>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
  import 'tinymce/themes/modern/theme'
  import Editor from '@tinymce/tinymce-vue'
  import 'tinymce/plugins/image'
  import 'tinymce/plugins/link'
  import 'tinymce/plugins/code'
  import 'tinymce/plugins/table'
  import 'tinymce/plugins/lists'
  import 'tinymce/plugins/contextmenu'
  import 'tinymce/plugins/wordcount'
  import 'tinymce/plugins/colorpicker'
  import 'tinymce/plugins/textcolor'

  export default {
    name: "Tinymce",
    components: {
      Editor
    },
    data() {
      return {
        tinymceHtml: '',
        init: {
          language_url: './static/tinymce/zh_CN.js',
          language: 'zh_CN',
          skin_url: './static/tinymce/skins/lightgray',
          height: 300,
          plugins: 'link lists image code table colorpicker textcolor wordcount contextmenu',
          toolbar:
            'bold italic underline strikethrough | fontsizeselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist | outdent indent blockquote | undo redo | link unlink image code | removeformat',
          branding: false
        }
      }
    },
    mounted() {
      tinymce.init({})
    }
  }
</script>

<style scoped>

</style>
