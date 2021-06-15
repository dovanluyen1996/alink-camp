import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    profile: {},
    isLoading: false,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setProfile(state, profile) {
      state.profile = profile;
    },
  },
  actions: {
    async getProfile(context) {
      context.commit('setIsLoading', true);

      try {
        const profile = await ApiClient.getCurrentUser();

        context.commit('setProfile', profile);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async updateProfile(context, params) {
      context.commit('setIsLoading', true);

      try {
        const profile = await ApiClient.updateCurrentUser(params);

        context.commit('setProfile', profile);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
