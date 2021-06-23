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
    async sendContact(context, params) {
      context.commit('setIsLoading', true);

      try {
        await ApiClient.sendContact(params);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
