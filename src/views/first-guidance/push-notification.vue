<template>
  <v-ons-page>
    <custom-toolbar title="初回案内" />
    <div class="content">
      <v-ons-card>
        push通知の説明文
      </v-ons-card>

      <fixed-footer>
        <v-ons-button @click="callToPushNotificationDialog">
          次へ
        </v-ons-button>
      </fixed-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import FixedFooter from '@/components/organisms/fixed-footer';

// pages
import IdfaGuidance from '@/views/first-guidance/idfa-guidance';

export default {
  name: 'FirstGuidancePushNotification',
  components: {
    FixedFooter,
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
