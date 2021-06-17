<template>
  <v-ons-page>
    <div>
      <input
        v-model="userSetting.isReceivableWeatherForecast"
        type="checkbox"
        @change="updateUserSetting"
      >
      <input
        v-model="userSetting.isReceivableDailyWhetherForecast"
        type="checkbox"
        @change="updateUserSetting"
      >
      <input
        v-model="userSetting.isReceivableWarning"
        type="checkbox"
        @change="updateUserSetting"
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
      await this.$store.dispatch('models/userSetting/updateUserSetting', params);
    },
  },
};
</script>
