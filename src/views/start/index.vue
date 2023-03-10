<template>
  <v-ons-page>
    <loading :visible="isLoading" />
    <div class="content start-page">
      <div class="start-page__top">
        <img
          src="@/assets/images/start/camp-logo-start.png"
          class="app-logo"
        >
        <div class="app-version">
          <small class="value">
            version:{{ appVersion }}
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
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters['models/appStart/isLoading'];
    },
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
@import '@/assets/scss/onsen-override/base-layout/_variables.scss';
@import '@/assets/scss/onsen-override/base-layout/iphonex-support/_variables.scss';

.start-page {
  display: flex;
  flex-direction: column;
  align-content: stretch;
  justify-content: center;
  text-align: center;

  &__top {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 135px;
    background-color: #fff;
    border-top: 5px solid #c30;
    border-bottom: 5px solid #c30;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 212px;

    .button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 86%;
      max-width: 325px;
      height: 60px;
      margin-bottom: 20px;
      font-size: 18px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}

.app-logo {
  // NOTE: 幅375pxで最適に見えるようにしている
  //       そのため302 / 372 ≈ 80.5% なので81％と半端にしている
  width: 81%;
  max-width: 302px;
}

.app-version {
  position: absolute;
  right: 14px;
  bottom: 6px;
  width: 315px;
  margin: 0 auto;
  font-weight: bold;
  color: #a82e05;
  text-align: right;

  .value {
    padding-left: 180px;
    font-size: 10px;
  }
}

// NOTE: loadingにはtoolbar分topが空けられているがスタート画面だけはtoolbarがないので調整が必要
.loading {
  top: 0;
}

.page[status-bar-fill] > .loading {
  top: 20px;
}

@media (orientation: portrait) {
  html[onsflag-iphonex-portrait] .loading {
    top: $--iphonex-safe-area-inset-top-portrait;
  }
}
</style>
