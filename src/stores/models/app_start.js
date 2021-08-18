import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    isLoading: false,
    appVersion: '',
  },
  getters: {
    current: state => state.appVersion,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setAppVersion(state, appVersion) {
      state.appVersion = appVersion;
    },
  },
  actions: {
    async getAppStart(context) {
      context.commit('setIsLoading', true);

      try {
        const appVersion = await ApiClient.getAppStart();

        context.commit('setAppVersion', appVersion);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
