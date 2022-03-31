import Vue from 'vue';

export default {
  strict: true,
  namespaced: true,
  state: {
    tabs: [],
    activeIndex: 0,
    enabled: true,
  },
  mutations: {
    setTabs(state, tabs) {
      Vue.set(state, 'tabs', tabs);
    },
    setActiveIndex(state, index) {
      state.activeIndex = index;
    },
    setEnabled(state, enabled) {
      state.enabled = enabled;
    },
  },
};
