const state = {
  options: [],
  activeIndex: '/ElementUITabs/StudentsMock'
};

const getters = {
  getStateOptions: (state, getters, rootState) => {
    return state.options;
  },
  getActiveIndex: (state, getters, rootState) => {
    return state.activeIndex;
  }
};

const mutations = {
  // 添加tab
  add_tabs(state, data) {
    state.options.push(data);
  },
  // 删除tab
  remove_tabs(state, route) {
    let index = 0;
    for (let option of state.options) {
      if (option.route === route) {
        break;
      }
      index++;
    }
    state.options.splice(index, 1);
  },
  // 设置当前激活的tab
  set_active_index(state, index) {
    state.activeIndex = index;
  }

};

const actions = {
  addTabs(context, data) {
    context.commit("add_tabs", data);
  },
  removeTabs(context, route) {
    context.commit("remove_tabs", route);
  },
  setActiveIndex(context, index) {
    context.commit("set_active_index", index);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
