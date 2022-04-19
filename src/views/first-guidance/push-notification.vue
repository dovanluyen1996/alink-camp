<template>
  <v-ons-page>
    <custom-toolbar
      modifier="green"
      title="PUSH通知許可"
    />
    <div class="background" />
    <div class="content">
      <first-guidance-index
        image-src="guidances/push-noti.svg"
        message="PUSH通知をONにすることで、予定日の天気予報、キャンプ場に近づく雨雲や、雷、突風などの情報をご確認いただけます。"
        @onClick="callToPushNotificationDialog"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import FirstGuidanceIndex from '@/components/organisms/first-guidance';

// pages
import IdfaGuidance from '@/views/first-guidance/idfa-guidance';

export default {
  name: 'FirstGuidancePushNotification',
  components: {
    FirstGuidanceIndex,
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
@import '@/assets/scss/_variables.scss';

.background {
  background: $bg-first-guidance;
}
</style>
