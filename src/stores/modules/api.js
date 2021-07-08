import Vue from 'vue';

export default {
  strict: true,
  namespaced: true,
  state: {
    error: {},
  },
  mutations: {
    setError(state, error) {
      Vue.set(state, 'error', error);
    },
  },
  actions: {
    resetError(context) {
      context.commit('setError', {});
    },
  },
};
