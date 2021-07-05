export default {
  async forecastScheduledDate(params) {
    const response = await this.get('/weather/forecast_scheduled_date', params);
    return response.data;
  },
  async forecast10Days(params) {
    const response = await this.get('/weather/forecast_10days', params);
    return response.data;
  },
  async forecastHourly(params) {
    const response = await this.get('/weather/forecast_hourly', params);
    return response.data;
  },
  async forecastMonthlyTemp(params) {
    const response = await this.get('/weather/forecast_monthly_temp', params);
    return response.data;
  },
  async forecastMonthlyPrecip(params) {
    const response = await this.get('/weather/forecast_monthly_precip', params);
    return response.data;
  },
  async forecastWind(params) {
    const response = await this.get('/weather/forecast_wind', params);
    return response.data;
  },
  async past(params) {
    const response = await this.get('/weather/past', params);
    return response.data;
  },
};
