import Vue from 'vue'
import Vuex from 'vuex'

import cart from './modules/cart'
import products from './modules/products'
import tabs from './modules/tabs'
import accounts from './modules/accounts'

//使用vuex
Vue.use(Vuex);

//创建Vuex实例
const store = new Vuex.Store({
  modules:{
    cart,
    products,
    tabs,
    accounts
  },
  state : {
    count : 1
  },
  //Getter相当于vue中的computed计算属性，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算，
  // 这里我们可以通过定义vuex的Getter来获取，Getters 可以用于监听、state中的值的变化，返回计算后的结果
  getters:{
    getStateCount:function(state){//上面的state
      return state.count + 1;
    }
  },
  /*
  官方并不建议我们这样直接去修改store里面的值，而是让我们去提交一个actions，
  在actions中提交mutation再去修改状态值
   */
  mutations:{
    add(state, n){
      state.count = state.count +n
    },
    reduce(state, n){
      state.count = state.count -n
    }
  },
  actions:{//注册actions, 类似vue里的methods
    /*
    如果我们需要指定加减的数值，那么我们直接传入dispatch中的第二个参数，然后在actions中的对应函数中
    接受参数在传递给mutations中的函数进行计算
     */
    addFun(context, n){
      context.commit("add", n);
    },
    reductionFun(context, n){
      context.commit("reduce", n)
    }
  }
});

export default store
