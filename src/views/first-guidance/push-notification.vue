<template>
  <v-ons-page>
    <custom-toolbar title="初回案内" />
    <div class="content">
      <content-with-footer>
        <v-ons-card>
          push通知の説明文
        </v-ons-card>

        <template #footer>
          <v-ons-button @click="callToPushNotificationDialog">
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
