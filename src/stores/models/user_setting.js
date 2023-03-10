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
    isLoading: state => state.isLoading,
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
    setIsEnabledWeatherForecastNotification(context, value) {
      const userSetting = { ...context.state.userSetting };
      userSetting.isEnabledWeatherForecastNotification = value;

      context.commit('setUserSetting', userSetting);
    },
    setIsEnabledWarningNotification(context, value) {
      const userSetting = { ...context.state.userSetting };
      userSetting.isEnabledWarningNotification = value;

      context.commit('setUserSetting', userSetting);
    },
    setIsEnabledThunderNotification(context, value) {
      const userSetting = { ...context.state.userSetting };
      userSetting.isEnabledThunderNotification = value;

      context.commit('setUserSetting', userSetting);
    },
    setIsEnabledChangeRainyNotification(context, value) {
      const userSetting = { ...context.state.userSetting };
      userSetting.isEnabledChangeRainyNotification = value;

      context.commit('setUserSetting', userSetting);
    },
    setIsEnabledSunriseSunsetNotification(context, value) {
      const userSetting = { ...context.state.userSetting };
      userSetting.isEnabledSunriseSunsetNotification = value;

      context.commit('setUserSetting', userSetting);
    },
    setIsEnabledTemperatureDifference(context, value) {
      const userSetting = { ...context.state.userSetting };
      userSetting.isEnabledTemperatureDifference = value;

      context.commit('setUserSetting', userSetting);
    },
    setIsEnabledItemsLestBehind(context, value) {
      const userSetting = { ...context.state.userSetting };
      userSetting.isEnabledItemsLestBehind = value;

      context.commit('setUserSetting', userSetting);
    },
  },
};
