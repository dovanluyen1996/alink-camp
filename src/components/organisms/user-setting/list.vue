<template>
  <card-with-title>
    <template #title>
      PUSH設定
    </template>

    <loading :visible="isLoading" />
    <v-ons-list modifier="noborder">
      <v-ons-list-item modifier="nodivider">
        <div class="center">
          <span class="list-item__title">
            天気の通知
            <v-ons-switch v-model="isReceivableWeatherForecast" />
          </span>
          <span class="list-item__subtitle">
            ※予定日3日前より定期的に該当コースの天気を通知します
          </span>
          <span class="list-item__subtitle">
            ※急な変化の際のキャンセルの判断にご利用ください
          </span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="nodivider">
        <div class="center">
          <span class="list-item__title">
            雨雲の通知
            <v-ons-switch v-model="isReceivableWarning" />
          </span>
          <span class="list-item__subtitle">
            ※予定日当日に該当コースに雨雲が近づいた場合に通知します
          </span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="nodivider">
        <div class="center">
          <span class="list-item__title">
            落雷＆突風注意報
            <v-ons-switch v-model="isReceivableThunder" />
          </span>
          <span class="list-item__subtitle">
            ※予定日当日に該当キャンプ場で落雷警報が出た場合にご連絡します
          </span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="nodivider">
        <div class="center">
          <span class="list-item__title">
            予報が晴⇒雨になったら通知
            <v-ons-switch v-model="isReceivableChangeRainy" />
          </span>
          <span class="list-item__subtitle">
            ※予定日の天気や、設定しているタスクにおいて変化があった場合に通知
          </span>
        </div>
      </v-ons-list-item>

      <v-ons-list-item v-show="isErrorPushPermisionVisible">
        <div class="center">
          <span class="list-item__alert">
            PUSH通知の許可がされていません。スマートフォンの設定からゴルフ天気を選択し、通知を許可してください
          </span>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </card-with-title>
</template>

<script>
import CardWithTitle from '@/components/organisms/card-with-title';

export default {
  name: 'UserSettingList',
  components: {
    CardWithTitle,
  },
  data() {
    return {
      isErrorPushPermisionVisible: false,
    };
  },
  computed: {
    userSetting() {
      return this.$store.getters['models/userSetting/userSetting'];
    },
    isLoading() {
      return this.$store.getters['models/userSetting/isLoading'];
    },
    isReceivableWeatherForecast: {
      get() {
        return this.userSetting && this.userSetting.isReceivableWeatherForecast;
      },
      async set(newValue) {
        this.$store.dispatch('models/userSetting/setIsReceivableWeatherForecast', newValue);
        await this.updateUserSetting();
      },
    },
    isReceivableWarning: {
      get() {
        return this.userSetting && this.userSetting.isReceivableWarning;
      },
      async set(newValue) {
        this.$store.dispatch('models/userSetting/setIsReceivableWarning', newValue);
        await this.updateUserSetting();
      },
    },
    isReceivableThunder: {
      get() {
        return this.userSetting && this.userSetting.isEnabledThunderNotification;
      },
      async set(newValue) {
        this.$store.dispatch('models/userSetting/setIsEnabledThunderNotification', newValue);
        await this.updateUserSetting();
      },
    },
    isReceivableChangeRainy: {
      get() {
        return this.userSetting && this.userSetting.isEnabledChangeRainyNotification;
      },
      async set(newValue) {
        this.$store.dispatch('models/userSetting/setIsEnabledChangeRainyNotification', newValue);
        await this.updateUserSetting();
      },
    },
  },
  async created() {
    await this.getUserSetting();
    await this.checkPermission();
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
    async checkPermission() {
      if (window.device.platform !== 'browser') {
        window.FirebasePlugin.hasPermission(async(hasPermission) => {
          if (hasPermission) {
            this.isErrorPushPermisionVisible = false;
          } else {
            this.isErrorPushPermisionVisible = true;
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.card {
  padding-top: 3px;
  padding-bottom: 22px;
}

.center {
  padding-top: 12px;
  padding-bottom: 12px;
}

.list-item {
  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: $font-size-large;
    font-weight: 600;
    line-height: 1.5;
  }

  &__subtitle {
    font-size: $font-size-small;
    color: $color-subtext;
  }

  &__alert {
    font-size: $font-size-default;
    color: $color-error-msg;
  }
}

.switch {
  margin-left: 20px;
}
</style>
