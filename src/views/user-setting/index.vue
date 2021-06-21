<template>
  <v-ons-page>
    <div>
      PUSH設定
      <div>
        天気予報
        <input
          v-model="userSetting.isReceivableWeatherForecast"
          type="checkbox"
          @change="updateUserSetting"
        >
        <div>
          ※予定日当日の予報が発表された際にご連絡します最速で10日前となります）
        </div>
      </div>

      <div>
        予定日の天気を毎日ご通知
        <input
          v-model="userSetting.isReceivableDailyWhetherForecast"
          type="checkbox"
          @change="updateUserSetting"
        >
        <div>
          ※予定日10日前より定期的に該当コースの天気をご連絡します <br>
          ※急な変化の際のキャンセルの判断にご利用ください
        </div>
      </div>
      <div>
        落雷、雨雲警報
        <input
          v-model="userSetting.isReceivableWarning"
          type="checkbox"
          @change="updateUserSetting"
        >
        <div>
          ※予定日当日に該当コースで落雷警報が出た場合にご連絡します
        </div>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
export default {
  computed: {
    userSetting() {
      return this.$store.getters['models/userSetting/userSetting'];
    },
  },
  async created() {
    await this.getUserSetting();
  },
  methods: {
    async getUserSetting() {
      await this.$store.dispatch('models/userSetting/getUserSetting');
    },
    async updateUserSetting() {
      try {
        await this.$store.dispatch('models/userSetting/updateUserSetting', this.userSetting);
      } catch (e) {
        this.getUserSetting();
      }
    },
  },
};
</script>
