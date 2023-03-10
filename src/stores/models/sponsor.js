import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    sponsors: [],
    isLoading: false,
  },
  getters: {
    all: state => state.sponsors,
  },
  mutations: {
    setSponsors(state, sponsors) {
      Vue.set(state, 'sponsors', sponsors);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getSponsors(context) {
      context.commit('setIsLoading', true);

      try {
        const sponsors = await ApiClient.getSponsors();

        context.commit('setSponsors', sponsors);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
