<template>
  <v-ons-page>
    <custom-toolbar
      modifier="green"
      title="PUSH通知許可"
    />

    <div class="content">
      <content-with-footer class="guidance-content">
        <div class="guidance-content__box">
          <img
            src="@/assets/images/guidances/push-noti.svg"
            width="280px"
          >
        </div>
        <p class="guidance-content__text">
          PUSH通知をONにすることで、予定日の天気予報、キャンプ場に近づく雨雲や、雷、突風などの情報をご確認いただけます。
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
    height: 280px;
  }

  &__text {
    margin-top: 80px !important;
  }
}
</style>
