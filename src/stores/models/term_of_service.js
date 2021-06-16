import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    termOfService: {},
    isLoading: false,
  },
  getters: {
    description: state => state.termOfService && state.termOfService.description,
  },
  mutations: {
    setTermOfService(state, termOfService) {
      Vue.set(state, 'termOfService', termOfService);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getTermOfService(context) {
      context.commit('setIsLoading', true);

      try {
        const termOfService = await ApiClient.getTermOfService();

        context.commit('setTermOfService', termOfService);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
