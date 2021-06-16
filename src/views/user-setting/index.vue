<template>
  <v-ons-page>
    <div>
      <input
        v-model="userSetting.isReceivableWeatherForecast"
        type="checkbox"
      >
      <input
        v-model="userSetting.is_receivable_daily_whether_forecast"
        type="checkbox"
      >
      <input
        v-model="userSetting.is_receivable_warning"
        type="checkbox"
      >
    </div>
  </v-ons-page>
</template>

<script>
export default {
  data() {
    return {
      userSetting: {},
    };
  },
  async created() {
    await this.getUserSetting();
    this.userSetting = { ...this.$store.getters['models/userSetting/userSetting'] };
  },
  methods: {
    async getUserSetting() {
      await this.$store.dispatch('models/userSetting/getUserSetting');
    },
    async updateUserSetting() {
      const params = {
        isReceivableWeatherForecast: this.userSetting.isReceivableWeatherForecast,
        isReceivableDailyWhetherForecast: this.userSetting.isReceivableDailyWhetherForecast,
        isReceivableWarning: this.userSetting.isReceivableWarning,
      };
      await this.$store.dispatch('models/userSetting/getUserSetting', params);
    },
  },
};
</script>
