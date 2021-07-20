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
    </div>
  </v-ons-page>
</template>

<script>
// components
import ContentWithFooter from '@/components/organisms/content-with-footer';

// pages
import PushNotification from '@/views/first-guidance/push-notification';

export default {
  name: 'FirstGuidanceLocationServices',
  components: {
    ContentWithFooter,
  },
  data() {
    return {
      lat: null,
      long: null,
    };
  },
  methods: {
    callToLocationServicesDialog() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.lat = position.coords.latitude;
            this.long = position.coords.longitude;
            resolve();
            this.goToPushNotification();
          }, (e) => {
            this.lat = null;
            this.lon = null;
            reject(e);
            this.goToPushNotification();
          }, {
            timeout: 30000,
            enableHighAccuracy: true,
          },
        );
      });
    },
    goToPushNotification() {
      this.$store.dispatch('appNavigator/push', PushNotification);
    },
  },
};
</script>

<style lang="scss" scoped>
.call-to-purchase {
  height: auto;
}
</style>
