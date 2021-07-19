import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    isLoading: false,
  },
  getters: {
    isLoading: state => state.isLoading,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async sendContact(context, params) {
      context.commit('setIsLoading', true);

      try {
        await ApiClient.sendContact(params);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
