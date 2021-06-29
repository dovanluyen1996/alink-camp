import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    user: {},
    isLoading: false,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async getUser(context) {
      context.commit('setIsLoading', true);

      try {
        const user = await ApiClient.getCurrentUser();

        context.commit('setUser', user);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async updateUser(context, params) {
      context.commit('setIsLoading', true);

      try {
        const user = await ApiClient.updateCurrentUser(params);

        context.commit('setUser', user);
        return true;
      } catch (e) {
        return false;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
