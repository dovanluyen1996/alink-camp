<template>
  <v-ons-page>
    <div class="content start-page">
      <div class="start-page__top">
        <img
          src="@/assets/images/start/logo.png"
          width="145px"
          height="160px"
          class="app-logo"
        >
        <div class="app-name">
          ゴルフ天気
        </div>
        <div class="app-version">
          <small>
            ver XXXX
          </small>
        </div>
      </div>
      <div class="start-page__bottom">
        <v-ons-button @click="start">
          早速天気を確認
        </v-ons-button>
        <v-ons-button @click="goToSignIn">
          アプリデータを引き継ぐ
        </v-ons-button>
      </div>
    </div>
  </v-ons-page>
</template>

<script>
// pages
import SignIn from '@/views/auth/sign-in';
import TermsOfService from '@/views/terms-of-service/unsigned';
import FirstGuidance from '@/views/first-guidance';

export default {
  name: 'StartIndex',
  methods: {
    created() {
      // NOTE: Firebase Analytics Sample
      // if (window.device.platform != 'browser') {
      //   FirebasePlugin.setScreenName('PurchaseInformation');
      //   FirebasePlugin.logEvent('screen_view', { content_type: 'page_view', item_id: 'home' });
      // }
    },
    start() {
      this.goToTermsOfService();
    },
    goToTermsOfService() {
      const acceptedTermsOfService = JSON.parse(localStorage.getItem('acceptedTermsOfService'));

      if (acceptedTermsOfService) {
        this.$store.dispatch('appNavigator/push', FirstGuidance);
      } else {
        this.$store.dispatch('appNavigator/push', TermsOfService);
      }
    },
    goToSignIn() {
      this.$store.dispatch('appNavigator/push', SignIn);
    },
  },
};

</script>
<style lang="scss" scoped>
.start-page {
  display: flex;
  flex-direction: column;
  align-content: stretch;
  justify-content: center;
  text-align: center;

  &__top {
    margin-bottom: 112px;
  }

  &__bottom {
    .button {
      width: 87%;
      max-width: 325px;
      margin-bottom: 20px;
      font-size: 18px;
    }
  }
}

.app-logo {
  margin-bottom: 20px;
}

.app-name {
  font-size: 20px;
  font-weight: 600;
  line-height: 34px;
}

.app-version {
  font-size: 15px;
  font-weight: 600;
  line-height: 26px;
}
</style>
