<template>
  <v-ons-page>
    <custom-toolbar
      modifier="green"
      title="位置情報取得"
    />

    <div class="content">
      <content-with-footer class="guidance-content">
        <div class="guidance-content__box">
          <img
            src="@/assets/images/guidances/location-service.svg"
            width="280px"
          >
        </div>
        <p class="guidance-content__text">
          位置情報をONにすることで、最適なキャンプ場や周辺の施設のご案内を利用頂けます。
        </p>

        <template #footer>
          <next-button @click="callToLocationServicesDialog" />
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
import NextButton from '@/components/atoms/first-guidance/next-button.vue';

// pages
import PushNotification from '@/views/first-guidance/push-notification';

import settings from '@/config/settings';

export default {
  name: 'FirstGuidanceLocationServices',
  components: {
    ContentWithFooter,
    NextButton,
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
    height: 280px;
    background-color: transparent;
  }

  &__text {
    margin-top: 80px !important;
  }
}
</style>
