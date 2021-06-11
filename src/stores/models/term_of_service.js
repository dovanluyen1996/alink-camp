import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    termOfService: {},
  },
  mutations: {
    setTermOfService(state, termOfService) {
      state.termOfService = termOfService;
    },
  },
  actions: {
    async getTermOfService(context) {
      context.commit('setIsLoading', true, { root: true });

      try {
        const termOfService = await ApiClient.getTermOfService();

        context.commit('setTermOfService', termOfService);
      } finally {
        context.commit('setIsLoading', false, { root: true });
      }
    },
  },
};
