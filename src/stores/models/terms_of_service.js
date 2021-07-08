import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    termsOfService: {},
    isLoading: false,
  },
  getters: {
    current: state => state.termsOfService,
  },
  mutations: {
    setTermsOfService(state, termsOfService) {
      Vue.set(state, 'termsOfService', termsOfService);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getTermsOfService(context) {
      context.commit('setIsLoading', true);

      try {
        const termsOfService = await ApiClient.getTermsOfService();

        context.commit('setTermsOfService', termsOfService);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
