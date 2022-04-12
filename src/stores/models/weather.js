import Vue from 'vue';
import ApiClient from '@/api_client';

export default {
  strict: true,
  namespaced: true,
  state: {
    isForecastScheduledDateLoading: [],
    isForecast14DaysLoading: false,
    isForecastHourlyLoading: false,
    isForecastMonthlyTempLoading: false,
    isForecastMonthlyPrecipLoading: false,
    isForecastWindLoading: false,
    isPastLoading: false,
    isForecastYearlyTempLoading: false,
    isForecastYearlyWeatherRateLoading: false,
  },
  getters: {
    isForecastScheduledDateLoading: state => state.isForecastScheduledDateLoading.length > 0,
    isForecast14DaysLoading: state => state.isForecast14DaysLoading,
    isForecastHourlyLoading: state => state.isForecastHourlyLoading,
    isForecastMonthlyTempLoading: state => state.isForecastMonthlyTempLoading,
    isForecastMonthlyPrecipLoading: state => state.isForecastMonthlyPrecipLoading,
    isForecastWindLoading: state => state.isForecastWindLoading,
    isPastLoading: state => state.isPastLoading,
    isForecastYearlyTempLoading: state => state.isForecastYearlyTempLoading,
    isForecastYearlyWeatherRateLoading: state => state.isForecastYearlyWeatherRateLoading,
  },
  mutations: {
    setIsForecastScheduledDateLoading(state, { params, isLoading }) {
      const findFunc = (camp) => {
        const campsiteId = camp.campsite_id;
        const targetDate = camp.target_date;

        return campsiteId === params.campsite_id && targetDate === params.target_date;
      };
      const index = state.isForecastScheduledDateLoading.findIndex(findFunc);

      console.log('[setIsForecastScheduledDateLoading]', params, index, isLoading);

      // ローディング状態をクリアするオブジェクトが見つからなければ何もしない
      if (!isLoading && index < 0) return;

      if (isLoading) {
        // ローディング中の状態にする
        // NOTE: 同じ内容の params が既にあっても push する
        state.isForecastScheduledDateLoading.push(params);
      } else {
        // ローディング状態をクリアする
        Vue.delete(state.isForecastScheduledDateLoading, index);
      }
    },
    setIsForecast14DaysLoading(state, isForecast14DaysLoading) {
      state.isForecast14DaysLoading = isForecast14DaysLoading;
    },
    setIsForecastHourlyLoading(state, isForecastHourlyLoading) {
      state.isForecastHourlyLoading = isForecastHourlyLoading;
    },
    setIsForecastMonthlyTempLoading(state, isForecastMonthlyTempLoading) {
      state.isForecastMonthlyTempLoading = isForecastMonthlyTempLoading;
    },
    setIsForecastMonthlyPrecipLoading(state, isForecastMonthlyPrecipLoading) {
      state.isForecastMonthlyPrecipLoading = isForecastMonthlyPrecipLoading;
    },
    setIsForecastWindLoading(state, isForecastWindLoading) {
      state.isForecastWindLoading = isForecastWindLoading;
    },
    setIsPastLoading(state, isPastLoading) {
      state.isPastLoading = isPastLoading;
    },
    setIsForecastYearlyTempLoading(state, isForecastYearlyTempLoading) {
      state.isForecastYearlyTempLoading = isForecastYearlyTempLoading;
    },
    setIsForecastYearlyWeatherRateLoading(state, isForecastYearlyWeatherRateLoading) {
      state.isForecastYearlyWeatherRateLoading = isForecastYearlyWeatherRateLoading;
    },
  },
  actions: {
    async getForecastScheduledDate(context, params) {
      context.commit('setIsForecastScheduledDateLoading', { params, isLoading: true });

      try {
        return await ApiClient.getForecastScheduledDate(params);
      } finally {
        context.commit('setIsForecastScheduledDateLoading', { params, isLoading: false });
      }
    },
    async getForecast14Days(context, params) {
      context.commit('setIsForecast14DaysLoading', true);

      try {
        return await ApiClient.getForecast14Days(params);
      } finally {
        context.commit('setIsForecast14DaysLoading', false);
      }
    },
    async getForecastHourly(context, params) {
      context.commit('setIsForecastHourlyLoading', true);

      try {
        return await ApiClient.getForecastHourly(params);
      } finally {
        context.commit('setIsForecastHourlyLoading', false);
      }
    },
    async getForecastMonthlyTemp(context, params) {
      context.commit('isForecastMonthlyTempLoading', true);

      try {
        return await ApiClient.getForecastMonthlyTemp(params);
      } finally {
        context.commit('isForecastMonthlyTempLoading', false);
      }
    },
    async getForecastMonthlyPrecip(context, params) {
      context.commit('setIsForecastMonthlyPrecipLoading', true);

      try {
        return await ApiClient.getForecastMonthlyPrecip(params);
      } finally {
        context.commit('setIsForecastMonthlyPrecipLoading', false);
      }
    },
    async getForecastWind(context, params) {
      context.commit('setIsForecastWindLoading', true);

      try {
        return await ApiClient.getForecastWind(params);
      } finally {
        context.commit('setIsForecastWindLoading', false);
      }
    },
    async getPast(context, params) {
      context.commit('setIsPastLoading', true);

      try {
        return await ApiClient.getPast(params);
      } finally {
        context.commit('setIsPastLoading', false);
      }
    },
    async getForecastYearlyTemp(context, params) {
      context.commit('setIsForecastYearlyTempLoading', true);

      try {
        return await ApiClient.getForecastYearlyTemp(params);
      } finally {
        context.commit('setIsForecastYearlyTempLoading', false);
      }
    },
    async getForecastYearlyWeatherRate(context, params) {
      context.commit('setIsForecastYearlyWeatherRateLoading', true);

      try {
        return await ApiClient.getForecastYearlyWeatherRate(params);
      } finally {
        context.commit('setIsForecastYearlyWeatherRateLoading', false);
      }
    },
  },
};
