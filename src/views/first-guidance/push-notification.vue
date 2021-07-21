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
        <p>PUSH通知をONにすることで、急な雨へのPUSH通知や、最適なゴルフコースの検索に活用いただけます。</p>

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
      // TODO: Push notificationsのダイアログを出してください
      console.log('callToLocationServicesDialog');
      this.goToIdfaGuidance();
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
