import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    forecastScheduledDate: {},
    forecast10Days: {},
    forecastHourly: {},
    forecastMonthlyTemp: {},
    forecastMonthlyPrecip: {},
    forecastWind: {},
    past: {},
    isLoading: false,
  },
  getters: {
    forecastScheduledDate: state => state.forecastScheduledDate,
    forecast10Days: state => state.forecast10Days,
    forecastHourly: state => state.forecastHourly,
    forecastMonthlyTemp: state => state.forecastMonthlyTemp,
    forecastMonthlyPrecip: state => state.forecastMonthlyPrecip,
    forecastWind: state => state.forecastWind,
    past: state => state.past,
  },
  mutations: {
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setForcastScheduledDate(state, forecastScheduledDate) {
      Vue.set(state, 'forecastScheduledDate', forecastScheduledDate);
    },
    setForecast10Days(state, forecast10Days) {
      Vue.set(state, 'forecast10Days', forecast10Days);
    },
    setForecastHourly(state, forecastHourly) {
      Vue.set(state, 'forecastHourly', forecastHourly);
    },
    setForecastMonthlyTemp(state, forecastMonthlyTemp) {
      Vue.set(state, 'forecastMonthlyTemp', forecastMonthlyTemp);
    },
    setForecastMonthlyPrecip(state, forecastMonthlyPrecip) {
      Vue.set(state, 'forecastMonthlyPrecip', forecastMonthlyPrecip);
    },
    setForecastWind(state, forecastWind) {
      Vue.set(state, 'forecastWind', forecastWind);
    },
    setPast(state, past) {
      Vue.set(state, 'past', past);
    },
  },
  actions: {
    async getForecastScheduledDate(context, params) {
      context.commit('setIsLoading', true);

      try {
        const forecastScheduledDate = await ApiClient.getForecastScheduledDate(params);

        context.commit('setForcastScheduledDate', forecastScheduledDate);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getForecast10Days(context, params) {
      context.commit('setIsLoading', true);

      try {
        const forecast10Days = await ApiClient.getForecast10Days(params);

        context.commit('setForecast10Days', forecast10Days);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getForecastHourly(context, params) {
      context.commit('setIsLoading', true);

      try {
        const forecastHourly = await ApiClient.getForecastHourly(params);

        context.commit('setForecastHourly', forecastHourly);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getForecastMonthlyTemp(context, params) {
      context.commit('setIsLoading', true);

      try {
        const forecastMonthlyTemp = await ApiClient.getForecastMonthlyTemp(params);

        context.commit('setForecastMonthlyTemp', forecastMonthlyTemp);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getForecastMonthlyPrecip(context, params) {
      context.commit('setIsLoading', true);

      try {
        const forecastMonthlyPrecip = await ApiClient.getForecastMonthlyPrecip(params);

        context.commit('setForecastMonthlyPrecip', forecastMonthlyPrecip);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getForecastWind(context, params) {
      context.commit('setIsLoading', true);

      try {
        const forecastWind = await ApiClient.getForecastWind(params);

        context.commit('setForecastWind', forecastWind);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
    async getPast(context, params) {
      context.commit('setIsLoading', true);

      try {
        const past = await ApiClient.getPast(params);

        context.commit('setPast', past);
      } finally {
        context.commit('setIsLoading', false);
      }
    },
  },
};
