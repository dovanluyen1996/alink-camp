import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    spots: {
      spots: [],
      totalCount: 0,
    },
    isLoading: false,
  },
  getters: {
    all: state => state.spots.spots,
    size: state => state.spots.spots.length,
    totalCount: state => state.spots.totalCount,
  },
  mutations: {
    setSpots(state, spots) {
      const newSpots = state.spots;
      newSpots.spots = [...newSpots.spots, ...spots.spots];
      newSpots.totalCount = spots.totalCount;

      Vue.set(state, 'spots', newSpots);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getSpots(context, params) {
      context.commit('setIsLoading', true);

      try {
        const spots = await ApiClient.getSpots(params);

        context.commit('setSpots', spots);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
