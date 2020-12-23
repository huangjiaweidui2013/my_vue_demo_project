<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="查询城市">
        <el-input v-model="form.city"></el-input>
      </el-form-item>
      <el-form-item label="实时天气">
        <el-input type="textarea" v-model="form.desc" :rows="10" size="medium"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :span="4" v-for="(item, index) in res.forecast" :key="index" :offset="index >0 ? 1 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.imgurl">
          <div style="padding: 14px;">
            <h3>{{item.date}}</h3>
            <h4>{{item.type}}</h4>
            <span style="color: brown;">温度: {{item.low}} / {{item.high}}</span>
            <span style="color: blue;">风向/风力: {{item.fengxiang}} / {{item.fengli}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-carousel :interval="4000" type="card" :height=" bannerHeight +'px'">
      <el-carousel-item v-for="(item1, index) in res.forecast" :key="index">
        <div :style="{width: '100%',height: '100%',padding: '0px', background: 'url('+item1.imgurl+') no-repeat center center', backgroundSize:'cover'}">
          <h3>{{item1.date}}</h3>
          <h4>{{item1.type}}</h4>
          <span style="color: brown;">温度: {{item1.low}} / {{item1.high}}</span>
          <span style="color: blue;">风向/风力: {{item1.fengxiang}} / {{item1.fengli}}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bannerHeight: '333',
        form: {
          city: '深圳',
          desc: ''
        },
        imageurl: {
          src1: require('../assets/images/qingtian.jpg'),
          src2: require('../assets/images/yutian.jpg'),
          src3: require('../assets/images/yintian.jpg'),
          src4: require('../assets/images/duoyun.jpg'),
          src5: require('../assets/images/wutian.jpg')
        },
        res: {
          ganmao: '',
          wendu: '',
          yesterday: {
            date: '',
            high: '',
            fx: '',
            low: '',
            fl: '',
            type: ''
          },
          forecast: [
            {
              imgurl: '',
              date: '',
              high: '',
              fengli: '',
              low: '',
              fengxiang: '',
              type: ''
            }
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        let options = {
          fullscreen: true,
          body: true,
          lock: true,
          text: '正在加载中,请稍候...',
          spinner: 'el-icon-loading',
          background :'rgba(0, 0, 0, 0.8)'
        };
        let loadingInstance = this.$loading(options);
        this.$axios.get('https://www.apiopen.top/weatherApi?city=' + this.form.city).then(res => {
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance.close();
          });
          if (res.data.code==200) {
            //element-ui 内置的消息提示
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: 'success'
            })

            this.form.desc = JSON.stringify(res)
            if (res.data.data.forecast.length === 5){
              res.data.data.forecast[0].imgurl = this.imageurl.src1;
              res.data.data.forecast[1].imgurl = this.imageurl.src2;
              res.data.data.forecast[2].imgurl = this.imageurl.src3;
              res.data.data.forecast[3].imgurl = this.imageurl.src4;
              res.data.data.forecast[4].imgurl = this.imageurl.src5;
            }
            let dat = res.data.data
            for (let d of dat.forecast){
              d.fengli = d.fengli.replace('<![CDATA[', '').replace(']]>','')

            }
            this.res = dat
            console.log(this.res)

          }else{
            this.$message({
              showClose: true,
              message: '请求后台数据失败!',
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  /*.el-carousel__item:nth-child(2n) {*/
  /*  background-color: cadetblue;*/
  /*}*/

  /*.el-carousel__item:nth-child(2n+1) {*/
  /*  background-color: lightgreen;*/
  /*}*/
</style>
