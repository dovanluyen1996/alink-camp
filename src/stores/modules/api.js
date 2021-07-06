import Vue from 'vue';

export default {
  strict: true,
  namespaced: true,
  state: {
    error: {},
    isSuccess: true,
  },
  mutations: {
    setError(state, error) {
      Vue.set(state, 'error', error);
      state.isSuccess = false;
    },
    setIsSuccess(state, isSuccess) {
      state.isSuccess = isSuccess;
    },
  },
  actions: {
    resetError(context) {
      context.commit('setError', {});
      context.commit('setIsSuccess', true);
    },
  },
};
