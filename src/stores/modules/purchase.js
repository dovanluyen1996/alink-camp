import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    isLoading: false,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setIsPurchased(state, isPurchased) {
      Vue.set(state, 'isPurchased', isPurchased);
    },
  },
  actions: {
    async getIsPurchased(context, params) {
      context.commit('setIsLoading', true);

      try {
        return await ApiClient.getIsPurchased(params);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
