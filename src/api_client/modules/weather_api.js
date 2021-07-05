export default {
  async getForecastScheduledDate(params) {
    const response = await this.get('/weather/forecast_scheduled_date', params);
    return response.data;
  },
  async getForecast10Days(params) {
    const response = await this.get('/weather/forecast_10days', params);
    return response.data;
  },
  async getForecastHourly(params) {
    const response = await this.get('/weather/forecast_hourly', params);
    return response.data;
  },
  async getForecastMonthlyTemp(params) {
    const response = await this.get('/weather/forecast_monthly_temp', params);
    return response.data;
  },
  async getForecastMonthlyPrecip(params) {
    const response = await this.get('/weather/forecast_monthly_precip', params);
    return response.data;
  },
  async getForecastWind(params) {
    const response = await this.get('/weather/forecast_wind', params);
    return response.data;
  },
  async getPast(params) {
    const response = await this.get('/weather/past', params);
    return response.data;
  },
};
