export default {
  strict: true,
  namespaced: true,
  state: {
    isVisible: false,
  },
  getters: {
    isVisble: state => state.isVisble,
  },
  mutations: {
    setVisible(state, isVisible) {
      state.isVisible = isVisible;
    },
  },
};
