<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="当前页面">
        <el-input v-model="form.page"></el-input>
      </el-form-item>
      <el-form-item label="每页数量">
        <el-input v-model="form.count"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">获取新闻</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" stripe fit highlight-current-row>
      <el-row>
        <el-table-column type="index" label="序号" fixed="left">
        </el-table-column>
        <el-table-column label="新闻标题" show-overflow-tooltip>
          <template slot-scope="scope">
            <a :href="scope.row.path"><h3>{{ scope.row.title }}</h3></a>
          </template>
        </el-table-column>
        <el-table-column label="时间" prop="passtime">
        </el-table-column>
        <el-table-column label="新闻缩略图">
          <template slot-scope="scope">
            <img :src="scope.row.image">
          </template>
        </el-table-column>
      </el-row>
    </el-table>
    <!--<div v-for="item of tableData" style="align-content: center;">
      <h5>{{ item.passtime }}</h5>
      <a :href="item.path"><h3>{{ item.title }}</h3></a>
      <img :src="item.image">
    </div>-->

  </div>
</template>

<script>
    export default {
      name: "NeteaseNews",
      data(){
          return {
            form: {
              page: 1,
              count: 5
            },
            tableData: [
              {
                'path': '',
                'title': '',
                'image': '',
                'passtime': ''
              }
            ]
          }
      },
      methods: {
        onSubmit(){
          let param = new URLSearchParams()
          param.append('page' , this.form.page)
          param.append('count' , this.form.count)
          this.$axios.post('https://api.apiopen.top/getWangYiNews', param)
            .then(res => {
              if (res.data.code==200) {
                //element-ui 内置的消息提示
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: 'success'
                })
                this.tableData = res.data.result
              }else{
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: 'error'
                })
              }
              //下面是消息的另一种写法
              // this.$message.info(res.data.message)
            })
        }
      }
    }
</script>

<style scoped>

</style>
