import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    userSetting: {},
    isLoading: false,
  },
  getters: {
    userSetting: state => state.userSetting,
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
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async updateUserSetting(context, params) {
      context.commit('setIsLoading', true);

      try {
        const userSetting = await ApiClient.updateUserSetting(params);

        context.commit('setUserSetting', userSetting);
      } catch (error) {
        context.commit('api/setError', error, { root: true });
        throw error;
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    setIsReceivableWeatherForecast(context, value) {
      const userSetting = { ...context.state.userSetting };
      userSetting.isReceivableWeatherForecast = value;

      context.commit('setUserSetting', userSetting);
    },
    setIsReceivableDailyWhetherForecast(context, value) {
      const userSetting = { ...context.state.userSetting };
      userSetting.isReceivableDailyWhetherForecast = value;

      context.commit('setUserSetting', userSetting);
    },
    setIsReceivableWarning(context, value) {
      const userSetting = { ...context.state.userSetting };
      userSetting.isReceivableWarning = value;

      context.commit('setUserSetting', userSetting);
    },
  },
};
