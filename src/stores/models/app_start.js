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
  },
  actions: {
    async getAppStart(context) {
      context.commit('setIsLoading', true);

      try {
        await ApiClient.getAppStart();
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
