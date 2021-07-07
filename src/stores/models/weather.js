import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    isLoading: false,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
  },
  actions: {
    async getForecastScheduledDate(context, params) {
      context.commit('setIsLoading', true);

      try {
        return await ApiClient.getForecastScheduledDate(params);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getForecast10Days(context, params) {
      context.commit('setIsLoading', true);

      try {
        return await ApiClient.getForecast10Days(params);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getForecastHourly(context, params) {
      context.commit('setIsLoading', true);

      try {
        return await ApiClient.getForecastHourly(params);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getForecastMonthlyTemp(context, params) {
      context.commit('setIsLoading', true);

      try {
        return await ApiClient.getForecastMonthlyTemp(params);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getForecastMonthlyPrecip(context, params) {
      context.commit('setIsLoading', true);

      try {
        return await ApiClient.getForecastMonthlyPrecip(params);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getForecastWind(context, params) {
      context.commit('setIsLoading', true);

      try {
        return await ApiClient.getForecastWind(params);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getPast(context, params) {
      context.commit('setIsLoading', true);

      try {
        return await ApiClient.getPast(params);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
