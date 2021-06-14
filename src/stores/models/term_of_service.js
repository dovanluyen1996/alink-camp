import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    termOfService: {},
    isLoading: false,
  },
  mutations: {
    setTermOfService(state, termOfService) {
      Vue.set(state, 'termOfService', termOfService);
    },
    setIsLoading(state, isLoading) {
      Vue.set(state, 'isLoading', isLoading);
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
