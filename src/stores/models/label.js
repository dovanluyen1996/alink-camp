import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    labels: [],
    isLoading: false,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setLabels(state, labels) {
      Vue.set(state, 'labels', labels);
    },
  },
  actions: {
    async getLabels(context) {
      context.commit('setIsLoading', true);

      try {
        const labels = await ApiClient.getLabels();

        context.commit('setLabels', labels);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
