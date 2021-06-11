import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    notices: [],
  },
  mutations: {
    setNotices(state, notices) {
      state.notices = notices;
    },
  },
  actions: {
    async getNotices(context) {
      context.commit('setIsLoading', true, { root: true });

      try {
        const notices = await ApiClient.getNotices();

        context.commit('setNotices', notices);
      } finally {
        context.commit('setIsLoading', false, { root: true });
      }
    },
  },
};
