<template>
  <v-ons-page>
    <div class="content start-page">
      <loading :visible="isLoading" />
      <div class="start-page__top">
        <img
          src="@/assets/images/start/logo-start.png"
          width="315px"
          height="119px"
          class="app-logo"
        >
        <div class="app-version">
          <small class="value">
            ver {{ appVersion }}
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
import CheckCompleteRegistration from '@/mixins/checkCompleteRegistration';
import ApiClient from '@/api_client';

// pages
import SignIn from '@/views/auth/sign-in';
import TermsOfService from '@/views/terms-of-service/confirm';
import FirstGuidance from '@/views/first-guidance';

export default {
  name: 'StartIndex',
  mixins: [CheckCompleteRegistration],
  data() {
    return {
      error: null,
      appVersion: '',
      isLoading: false,
    };
  },
  async created() {
    // NOTE: Firebase Analytics Sample
    // if (window.device.platform != 'browser') {
    //   FirebasePlugin.setScreenName('PurchaseInformation');
    //   FirebasePlugin.logEvent('screen_view', { content_type: 'page_view', item_id: 'home' });
    // }
    await this.getAppStart();
    await this.getAppVersion();

    const isAuthenticated = await this.isAuthenticated();
    if (isAuthenticated) {
      this.checkBeforeGoToAppTabbar();
    }
  },
  methods: {
    async getAppStart() {
      try {
        await this.$store.dispatch('models/appStart/getAppStart');
      } catch (e) {
        console.error(e);
      }
    },
    async isAuthenticated() {
      const sessionHeaders = await ApiClient.buildSessionHeaders();

      return this.$helpers.isPresentObject(sessionHeaders);
    },
    async start() {
      await this.$store.dispatch('models/appStart/getAppStart');
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
    async goToSignIn() {
      await this.$store.dispatch('models/appStart/getAppStart');
      this.$store.dispatch('appNavigator/push', SignIn);
    },
    async getAppVersion() {
      this.appVersion = await cordova.getAppVersion.getVersionNumber();
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
    margin-bottom: 180px;
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

.app-version {
  width: 315px;
  margin: 0 auto;
  font-size: 18px;
  font-weight: 600;
  color: white;
  text-align: left;

  .value {
    padding-left: 180px;
  }
}

/deep/ {
  .page__background {
    background-image: url('~@/assets/images/background-start.png');
    background-position: center;
    background-size: cover;
  }
}
</style>
