import Vue from 'vue';

export default {
  strict: true,
  namespaced: true,
  state: {
    isPurchased: false,
  },
  getters: {
    isPurchased: state => state.isPurchased,
  },
  mutations: {
    setIsPurchased(state, isPurchased) {
      Vue.set(state, 'isPurchased', isPurchased);
    },
  },
  actions: {
    setIsPurchased(context, isPurchased) {
      context.commit('setIsPurchased', isPurchased);
    },
  },
};
