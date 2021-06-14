<template>
  <v-ons-page>
    <custom-toolbar title="初回案内" />
    <div class="content">
      <v-ons-card>
        位置情報取得の説明文
      </v-ons-card>

      <fixed-footer>
        <v-ons-button @click="callToLocationServicesDialog()">
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
import PushNotification from '@/views/first-guidance/push-notification';

export default {
  name: 'FirstGuidanceLocationServices',
  components: {
    FixedFooter,
  },
  methods: {
    callToLocationServicesDialog() {
      // TODO: location servicesのダイアログを出してください
      console.log('callToLocationServicesDialog');
      this.goToPushNotification();
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
