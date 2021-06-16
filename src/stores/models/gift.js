import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    gifts: [],
    isLoading: false,
  },
  getters: {
    all: state => state.gifts,
    findById: state => giftId => state.gifts.find(gift => gift.id === giftId),
  },
  mutations: {
    setGifts(state, gifts) {
      Vue.set(state, 'gifts', gifts);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getGifts(context) {
      context.commit('setIsLoading', true);

      try {
        const gifts = await ApiClient.getGifts();

        context.commit('setGifts', gifts);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
