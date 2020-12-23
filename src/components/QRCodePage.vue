<template>
  <div>
    <el-row :gutter="12">
    <el-col :span="8">
      <el-card shadow="hover">
        <div slot="header">
          <span>方式一：qrcode, 示例1</span>
          <el-button type="primary" round @click="buttonClick">点击更换内容</el-button>
        </div>
        <div class="qrcodeClass" ref="qrCodeDiv1"></div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover">
        <div slot="header">
          <span>方式一：qrcode, 示例2</span>
        </div>
        <div class="qrcodeClass" ref="qrCodeDiv2"></div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card shadow="hover">
        <div slot="header">
          <span>方式一：qrcode, 示例3</span>
        </div>
        <div class="qrcodeClass" ref="qrCodeDiv3"></div>
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="12">
    <el-col :span="8">
      <el-card shadow="hover">
        <div slot="header">
          <span>方式二：vue-qr</span>
        </div>
        <!-- logoSrc为logo的url地址(使用require的方式)；text为需要转换为二维码的内容;
        margin: 二维码图像的外边距, 默认 20px，一定要设置为零，否则会被莫名奇妙的压缩 -->
        <vue-qr :logoSrc="imageUrl" :margin="0" :text="vueQRCodeText" :size="200"></vue-qr>
      </el-card>
    </el-col>
  </el-row>
  </div>
</template>

<script>
/**
 * 注意点
1.显示内容(text所指向内容)必须是UTF-8编码格式。

2.生成二维码js必须在 this.$nextTick(function(){调用})或setTimeout(() => { 调用 }, 100)，是为了确保二维码容器DOM已经存在。

3.为了防止重复生成二维码，生成二维码前先清空区域：
document.getElementById("qrCodeDiv1").innerHTML = "";
或者 this.$refs.qrCodeDiv1.innerHTML = ""
 */
import QRCode from 'qrcodejs2'
import vueQr from 'vue-qr'
export default {
  name: 'QRCodePage',
  components: {
    vueQr
  },
  data () {
    return {
      imageUrl: require("../assets/images/fenghuang.jpeg"),
      vueQRCodeText: '这是vue中使用vue-qr组件生成二维码的示例'
    }
  },
  methods: {
    createQrCode1(){
      let qrCode = new QRCode(this.$refs.qrCodeDiv1, {
          text: '这是vue中使用qrcode组件生成二维码的示例',
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
      })
    },
    buttonClick() {
      // 清空原有的二维码
      // document.getElementById('qrCodeDiv1').innerHTML = ""
      this.$refs.qrCodeDiv1.innerHTML = ""
      let qrCode = new QRCode(this.$refs.qrCodeDiv1, {
          text: '使用qrcode组件生成二维码: ' + Math.random().toFixed(5)*100000,
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
      })
    }
  },
  created() {
    // 第二种：放置在created生命周期函数中，但是注意一定要放在this.$nextTick的回掉函数中
    this.$nextTick(function(){
      new QRCode(this.$refs.qrCodeDiv2, {
        text: '使用qrcode组件生成二维码的示例2',
        width: 150,
        height: 150,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
      })
    })
  },
  mounted() {
    // js代码有三种放入位置
    // 第一种：放置在mounted生命周期函数中
    new QRCode(this.$refs.qrCodeDiv3, {
        text: '使用qrcode组件生成二维码的示例3',
        width: 180,
        height: 180,
        colorDark: "#333333", //二维码颜色
        colorLight: "#ffffff", //二维码背景色
        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
      })

    // 第三种方式：放置在methods属性中的指定方法中，
    // 并且在mouted生命周期函数中调用这个方法（最好也把这个方法的调用放置在this.$nextTick的回掉函数中）
    this.$nextTick(function() {
      this.createQrCode1()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .qrcodeClass{
    display: inline-block;
    background-color:cadetblue;
    padding: 6px; // 利用padding的特性，挤出白边
    img {
      background-color: #fff; //设置白色背景色
      box-sizing: border-box;
    }
  }

</style>
