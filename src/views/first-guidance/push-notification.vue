<template>
  <v-ons-page>
    <custom-toolbar
      modifier="green"
      title="PUSH通知許可"
      :disabled-back-button="true"
    />

    <div class="content">
      <content-with-footer class="guidance-content">
        <div class="guidance-content__box">
          <img
            src="@/assets/images/guidances/push-noti.png"
            width="117px"
          >
        </div>
        <p>
          PUSH通知をＯＮにすることで、急な雨へのＰＵＳＨ通知や、最適なキャンプ場の検索に活用いただけます。
        </p>

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

.guidance-content {
  &__box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 260px;

    img {
      height: 117px;
    }
  }
}
</style>
