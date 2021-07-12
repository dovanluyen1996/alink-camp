export default {
  strict: true,
  namespaced: true,
  state: {
    activeIndex: 0,
  },
  getters: {
    activeIndex: state => state.activeIndex,
  },
  mutations: {
    setActiveIndex(state, activeIndex) {
      state.activeIndex = activeIndex;
    },
    resetActiveIndex(state) {
      state.activeIndex = 0;
    },
  },
};
