export default {
  strict: true,
  namespaced: true,
  state: {
    isShow: false,
  },
  getters: {
    isShow: state => state.isShow,
  },
  mutations: {
    setIsShow(state, isShow) {
      state.isShow = isShow;
    },
  },
  actions: {
    setIsShow(context, isShow) {
      context.commit('setIsShow', isShow);
    },
  },
};
