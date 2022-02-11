<template>
  <v-ons-page>
    <custom-toolbar
      modifier="green"
      title="位置情報取得"
      :disabled-back-button="true"
    />

    <div class="content">
      <content-with-footer class="guidance-content">
        <div class="guidance-content__box">
          <img
            src="@/assets/images/guidances/location-service.png"
            width="143px"
          >
        </div>
        <p>
          位置情報をＯＮにすることで、最適なキャンプ場の検索に活用いただけます。
        </p>

        <template #footer>
          <v-ons-button
            modifier="large"
            @click="callToLocationServicesDialog()"
          >
            次へ
          </v-ons-button>
        </template>
      </content-with-footer>

      <v-ons-alert-dialog
        :visible.sync="geoLocationErrorVisible"
      >
        <template #title>
          位置情報が取得できませんでした
        </template>

        位置情報が取得できませんでした。<br>
        お手数ですが、通信状況の良いところで再度お試しください。または、アプリの設定にて位置情報送信の許諾をしているかご確認ください

        <template #footer>
          <v-ons-button
            @click="closeGeoLocationErrorDialog()"
          >
            OK
          </v-ons-button>
        </template>
      </v-ons-alert-dialog>
    </div>
  </v-ons-page>
</template>

<script>
// components
import ContentWithFooter from '@/components/organisms/content-with-footer';

// pages
import PushNotification from '@/views/first-guidance/push-notification';

import settings from '@/config/settings';

export default {
  name: 'FirstGuidanceLocationServices',
  components: {
    ContentWithFooter,
  },
  data() {
    return {
      geoLocationErrorVisible: false,
    };
  },
  methods: {
    callToLocationServicesDialog() {
      navigator.geolocation.getCurrentPosition(
        () => {
          this.goToPushNotification();
        }, (e) => {
          console.log(e);
          this.geoLocationErrorVisible = true;
        }, {
          timeout: settings.locationServices.timeout,
        },
      );
    },
    goToPushNotification() {
      this.$store.dispatch('appNavigator/push', PushNotification);
    },
    closeGeoLocationErrorDialog() {
      this.geoLocationErrorVisible = false;
      this.goToPushNotification();
    },
  },
};
</script>

<style lang="scss" scoped>
.call-to-purchase {
  height: auto;
}

.guidance-content {
  &__box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 260px;
    background-color: transparent;

    & > img {
      height: 114px;
    }
  }
}
</style>
