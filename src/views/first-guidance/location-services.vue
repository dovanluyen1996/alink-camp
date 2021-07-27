<template>
  <v-ons-page>
    <custom-toolbar title="初回案内" />

    <div class="content">
      <content-with-footer>
        <v-ons-card>
          位置情報取得の説明文
        </v-ons-card>

        <template #footer>
          <v-ons-button @click="callToLocationServicesDialog()">
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
        お手数ですが、通信状況の良いところで再度お試しください。

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
          this.showGeoLocationErrorDialog();
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
    showGeoLocationErrorDialog() {
      this.geoLocationErrorVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.call-to-purchase {
  height: auto;
}
</style>
