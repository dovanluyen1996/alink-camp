import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    userStamp: {},
    isLoading: false,
  },
  mutations: {
    setUserStamp(state, userStamp) {
      Vue.set(state, 'userStamp', userStamp);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getUserStamp(context) {
      context.commit('setIsLoading', true);

      try {
        const userStamp = await ApiClient.getUserStamp();

        console.log(1001);
        console.log(userStamp);

        context.commit('setUserStamp', userStamp);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
