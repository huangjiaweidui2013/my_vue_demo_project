<template>
    <div>
      <h3>这是使用vuex的一个页面</h3>
      <el-form ref="form" :model="form" label-width="300px">
        <el-form-item label="直接从Vuex中得到的count数值:">
<!--          如果我们不喜欢这种在页面上使用“this.$stroe.state.count”和“this.$store.dispatch('funName')”
这种很长的写法，那么我们可以使用mapState、mapGetters、mapActions就不会这么麻烦了-->
          <span>{{this.$store.state.count}}</span>
          <span style="margin-left: 100px;color: #409EFF;">{{count1}}</span>
        </el-form-item>
        <el-form-item label="从Getters获取的计算+1后的数值:">
          <span>{{this.$store.getters.getStateCount}}</span>
          <span style="margin-left: 100px;color: brown;">{{getStateCount1}}</span>
        </el-form-item>
        <el-form-item label="每次增减数值设置:">
          <el-input-number v-model="form.num1"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addFun">增加</el-button>
          <el-button type="warning" @click="reduceFun">减少</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
  import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
    export default {
      name: "VuexDemo",
      data() {
          return {
            form: {
              num1: 2
            }
          }
      },
      computed:{
        ...mapState({
          count1: state=>state.count
        }),
        ...mapGetters({
          // 把 `this.getStateCount1` 映射为 `this.$store.getters.getStateCount`
          getStateCount1: 'getStateCount'
        })
      },
      methods:{
        addFun(){
          //直接调用mutations,官方不推荐这种用法
          // this.$store.commit("add", this.form.num1)
          //推荐使用actions
          this.$store.dispatch("addFun", this.form.num1)
        },
        reduceFun(){
          //直接调用mutations,官方不推荐这种用法
          // this.$store.commit("reduce", this.form.num1)
          //推荐使用actions
          this.$store.dispatch("reductionFun", this.form.num1)
        }
      }
    }
</script>

<style scoped>

</style>
