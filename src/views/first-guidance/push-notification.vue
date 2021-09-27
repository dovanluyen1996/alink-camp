<template>
  <v-ons-page>
    <custom-toolbar
      modifier="green"
      title="PUSH通知許可"
    />

    <div class="content">
      <content-with-footer class="guidance-content">
        <img
          src="@/assets/images/guidances/push-noti.png"
          width="118px"
        >
        <p>PUSH通知をONにすることで、ゴルフプレイ中に雨雲が近づいた場合や、予定日設定したゴルフ場の天気予報を定期的にお知らせいたします。</p>

        <template #footer>
          <v-ons-button
            modifier="large"
            @click="callToPushNotificationDialog"
          >
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
import IdfaGuidance from '@/views/first-guidance/idfa-guidance';

export default {
  name: 'FirstGuidancePushNotification',
  components: {
    ContentWithFooter,
  },
  methods: {
    callToPushNotificationDialog() {
      if (window.device.platform !== 'browser') {
        window.FirebasePlugin.hasPermission((hasPermission) => {
          if (hasPermission) {
            this.goToIdfaGuidance();
          } else {
            this.grantPermission();
          }
        });
      } else {
        this.goToIdfaGuidance();
      }
    },
    grantPermission() {
      window.FirebasePlugin.grantPermission(() => {
        this.goToIdfaGuidance();
      }, (error) => {
        console.error(error);
      });
    },
    goToIdfaGuidance() {
      this.$store.dispatch('appNavigator/push', IdfaGuidance);
    },
  },
};
</script>

<style lang="scss" scoped>
.call-to-purchase {
  height: auto;
}
</style>
