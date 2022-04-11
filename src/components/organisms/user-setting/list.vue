<template>
  <card-with-title>
    <template #title>
      PUSH設定
    </template>

    <template #section>
      <div
        v-if="!isPurchased"
        class="banner-wrap"
      >
        <img
          class="banner-img"
          src="@/assets/images/push-notification-weather-purchase.png"
          alt="weather-purchase"
          @click="goToPurchaseInformation"
        >
      </div>
    </template>

    <v-ons-list modifier="noborder">
      <v-ons-list-item
        v-show="isErrorPushPermisionVisible"
        modifier="nodivider"
      >
        <div class="center">
          <span class="list-item__alert">
            PUSH通知の許可がされていません。スマートフォンの設定からキャンプ天気を選択し、通知を許可してください。
          </span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="nodivider">
        <div class="center">
          <span class="list-item__title">
            予定日の天気を毎日ご連絡
            <v-ons-switch v-model="isEnabledWeatherForecastNotification" />
          </span>
          <span class="list-item__subtitle">
            ※予定日3日前より定期的に該当キャンプ場の天気をご連絡します。
          </span>
          <span class="list-item__subtitle">
            ※キャンセルの判断にご利用ください
          </span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="nodivider">
        <div class="center">
          <span class="list-item__title">
            雨雲の通知
            <v-ons-switch v-model="isEnabledWarningNotification" />
          </span>
          <span class="list-item__subtitle">
            ※予定日当日に該当コースに雨雲が近づいた場合に通知します
          </span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item
        modifier="nodivider"
        v-if="isPurchased"
      >
        <div class="center">
          <span class="list-item__title">
            落雷＆突風注意報
            <v-ons-switch v-model="isEnabledThunderNotification" />
          </span>
          <span class="list-item__subtitle">
            ※予定日当日に該当キャンプ場で落雷警報が出た場合にご連絡します
          </span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item
        modifier="nodivider"
        v-if="isPurchased"
      >
        <div class="center">
          <span class="list-item__title">
            予報が晴⇒雨になったら通知
            <v-ons-switch v-model="isEnabledChangeRainyNotification" />
          </span>
          <span class="list-item__subtitle">
            ※予定日の天気や、設定しているタスクにおいて変化があった場合に通知
          </span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="nodivider">
        <div class="center">
          <span class="list-item__title">
            日の出、日の入の通知
            <v-ons-switch v-model="isEnabledSunriseSunsetNotification" />
          </span>
          <span class="list-item__subtitle">
            ※日の出、日の入の30分前にお知らせする通知
          </span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item modifier="nodivider">
        <div class="center">
          <span class="list-item__title">
            気温差通知
            <v-ons-switch v-model="isEnabledTemperatureDifference" />
          </span>
          <span class="list-item__subtitle">
            ※予定日当日に昼から夜にかけて気温差が大きい場合に通知
          </span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item
        modifier="nodivider"
        v-if="isPurchased"
      >
        <div class="center">
          <span class="list-item__title">
            忘れ物注意の連絡
            <v-ons-switch v-model="isEnabledItemsLestBehind" />
          </span>
          <span class="list-item__subtitle">
            ※予定日当日に忘れ物がないかの確認通知
          </span>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </card-with-title>
</template>

<script>
// components
import CardWithTitle from '@/components/organisms/card-with-title';

// pages
import PurchaseInformation from '@/views/purchase-information/index';

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
    isEnabledWeatherForecastNotification: {
      get() {
        return this.userSetting && this.userSetting.isEnabledWeatherForecastNotification;
      },
      async set(newValue) {
        this.$store.dispatch('models/userSetting/setIsEnabledWeatherForecastNotification', newValue);
        await this.updateUserSetting();
      },
    },
    isEnabledWarningNotification: {
      get() {
        return this.userSetting && this.userSetting.isEnabledWarningNotification;
      },
      async set(newValue) {
        this.$store.dispatch('models/userSetting/setIsEnabledWarningNotification', newValue);
        await this.updateUserSetting();
      },
    },
    isEnabledThunderNotification: {
      get() {
        return this.userSetting && this.userSetting.isEnabledThunderNotification;
      },
      async set(newValue) {
        this.$store.dispatch('models/userSetting/setIsEnabledThunderNotification', newValue);
        await this.updateUserSetting();
      },
    },
    isEnabledChangeRainyNotification: {
      get() {
        return this.userSetting && this.userSetting.isEnabledChangeRainyNotification;
      },
      async set(newValue) {
        this.$store.dispatch('models/userSetting/setIsEnabledChangeRainyNotification', newValue);
        await this.updateUserSetting();
      },
    },
    isEnabledSunriseSunsetNotification: {
      get() {
        return this.userSetting && this.userSetting.isEnabledSunriseSunsetNotification;
      },
      async set(newValue) {
        this.$store.dispatch('models/userSetting/setIsEnabledSunriseSunsetNotification', newValue);
        await this.updateUserSetting();
      },
    },
    isEnabledTemperatureDifference: {
      get() {
        return this.userSetting && this.userSetting.isEnabledTemperatureDifference;
      },
      async set(newValue) {
        this.$store.dispatch('models/userSetting/setIsEnabledTemperatureDifference', newValue);
        await this.updateUserSetting();
      },
    },
    isEnabledItemsLestBehind: {
      get() {
        return this.userSetting && this.userSetting.isEnabledItemsLestBehind;
      },
      async set(newValue) {
        this.$store.dispatch('models/userSetting/setIsEnabledItemsLestBehind', newValue);
        await this.updateUserSetting();
      },
    },
    isPurchased() {
      return this.$store.getters['purchase/isPurchased'];
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
    goToPurchaseInformation() {
      this.$store.dispatch('menuNavigator/push', PurchaseInformation);
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

.banner-wrap {
  margin: 10px 20px 0;

  .banner-img {
    width: 100%;
  }
}
</style>
