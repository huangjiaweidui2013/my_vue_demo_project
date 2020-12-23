import LOCALSTORAGE from '../../store/localStorage'

const ACCOUNTS = "accounts";

const state = {
  current: {
    currentUsername: '',
    currentPassword: ''
  },
  accounts: [
    {
      userName: 'admin',
      password: '123',
      realName: 'admin',
      accountType: 0,
      sex: 0,
      age: 18,
      birthday: '1999-01-01',
      home: '湖北',
      isValid: true
    },
    {
      userName: 'test',
      password: '123',
      realName: 'test',
      accountType: 0,
      sex: 1,
      age: 20,
      birthday: '1999-01-01',
      home: '湖南',
      isValid: true
    }
  ]
};

const getters = {
  getAccounts(state, getters, rootState, rootGetters){
    return state.accounts;
  },
  getCurrent(state, getters, rootState, rootGetters){
    return state.current;
  }
};

const mutations = {
  get_current_account(state){
    return state.current;
  },
  set_current_account(state, data){
    state.current.currentUsername = data.currentUsername;
    state.current.currentPassword = data.currentPassword;
  },
  add_account(state, data){
    mutations.get_all_account(state);
    let ind = state.accounts.findIndex(item => item.userName === data.userName);
    if (ind = -1){
      state.accounts.push(data);
      // 键是唯一的”这个特性也是相当重要的，重复以同一个键来赋值的话，会覆盖上次的值
      LOCALSTORAGE.setItemToLocalStorage(ACCOUNTS, state.accounts);
    }
  },
  edit_account(state, data){
    mutations.get_all_account(state);
    let ind = state.accounts.findIndex(item => item.userName === data.userName);
    if (ind > 0){
      // splice()方法返回的是删除后的数组元素,如果要获取删除指定元素后的数组,直接调用原来的数组即可！因为splice()会改变原来数组！
      state.accounts.splice(ind, 1, data);
      LOCALSTORAGE.setItemToLocalStorage(ACCOUNTS, state.accounts);
    }
  },
  delete_account(state, username){
    mutations.get_all_account(state);
    let ind = state.accounts.findIndex(item => item.userName === username);
    if (ind > 0){
      state.accounts.splice(ind, 1);
      LOCALSTORAGE.setItemToLocalStorage(ACCOUNTS, state.accounts);
    }
  },
  query_account_by_username(state, username){
    mutations.get_all_account(state);
    let ind = state.accounts.findIndex(item => item.userName === username);
    if (ind > 0){
      return state.accounts[ind];
    }else{
      return null;
    }
  },
  get_all_account(state){
    let t = LOCALSTORAGE.getItemFromLocalStorage(ACCOUNTS);
    if (!t){
      LOCALSTORAGE.setItemToLocalStorage(ACCOUNTS, state.accounts);
    }else{
      state.accounts = t;
    }
    return state.accounts;
  }
};

const actions = {
  getCurrentAccount(context) {
    context.commit("get_current_account");
  },
  setCurrentAccount(context, data) {
    context.commit("set_current_account", data);
  },
  addAccount(context, data) {
    context.commit("add_account", data);
  },
  editAccount(context, data) {
    context.commit("edit_account", data);
  },
  deleteAccount(context, username) {
    context.commit("delete_account", username);
  },
  queryAccountByUsername(context, username) {
    context.commit("query_account_by_username", username);
  },
  getAllAccount(context) {
    context.commit("get_all_account");
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
