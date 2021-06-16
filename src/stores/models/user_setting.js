import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    userSetting: {},
    isLoading: false,
  },
  mutations: {
    setUserSetting(state, userSetting) {
      Vue.set(state, 'userSetting', userSetting);
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getUserSetting(context) {
      context.commit('setIsLoading', true);

      try {
        const userSetting = await ApiClient.getUserSetting();

        context.commit('setUserSetting', userSetting);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async updateUserSetting(context, params) {
      context.commit('setIsLoading', true);

      try {
        const userSetting = await ApiClient.updateUserSetting(params);

        context.commit('setUserSetting', userSetting);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
