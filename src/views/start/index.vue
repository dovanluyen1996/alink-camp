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

      <error-dialog
        title="課金エラーが発生しました"
        :is-visible="checkChargedStatusErrorVisible"
        @close="closeCheckChargedStatusError"
      />
    </div>
  </v-ons-page>
</template>

<script>
import CheckCompleteRegistration from '@/mixins/checkCompleteRegistration';

// pages
import SignIn from '@/views/auth/sign-in';
import TermsOfService from '@/views/terms-of-service/confirm';
import FirstGuidance from '@/views/first-guidance';
import PurchaseInformation from '@/views/purchase-information';
import ErrorDialog from '@/components/organisms/error-dialog';

export default {
  name: 'StartIndex',
  components: {
    ErrorDialog,
  },
  mixins: [CheckCompleteRegistration],
  data() {
    return {
      error: null,
      checkChargedStatusErrorVisible: false,
    };
  },
  async created() {
    // NOTE: Firebase Analytics Sample
    // if (window.device.platform != 'browser') {
    //   FirebasePlugin.setScreenName('PurchaseInformation');
    //   FirebasePlugin.logEvent('screen_view', { content_type: 'page_view', item_id: 'home' });
    // }
    this.getAppStart();

    if (BuildInfo.debug) {
      return this.checkChargedStatusOnlyDebug();
    }

    return this.checkChargedStatus();
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
      let authResult = null;
      try {
        authResult = await this.$cognito.isAuthenticated();
      } catch (err) {
        console.error(err);
      }
      return authResult;
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
    checkChargedStatus() {
      Purchases.getPurchaserInfo(
        async(purchaserInfo) => {
          const isCharged = Object.entries(purchaserInfo.entitlements.active).length > 0;
          this.checkChargedStatusComplete(isCharged);
        },
        () => {
          this.checkChargedStatusErrorVisible = true;
          this.checkChargedStatusComplete(false);
        },
      );
    },
    async checkChargedStatusOnlyDebug() {
      const isCharged = JSON.parse(localStorage.getItem('isCharged'));
      await this.checkChargedStatusComplete(isCharged);
    },
    async checkChargedStatusComplete(isCharged) {
      if (isCharged) {
        const isAuthenticated = await this.isAuthenticated();
        if (isAuthenticated) {
          this.$helpers.createUserDevise();
          this.checkBeforeGoToAppTabbar();
        }
      } else {
        this.$store.dispatch('appNavigator/push', PurchaseInformation);
      }
    },
    closeCheckChargedStatusError() {
      this.checkChargedStatusErrorVisible = false;
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
