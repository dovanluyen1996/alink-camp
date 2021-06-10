<template>
  <ons-page>
    <div class="background"></div>
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
        <v-ons-button @click="goToAuth">
          アプリデータを引き継ぐ
        </v-ons-button>
      </div>
    </div>
  </ons-page>
</template>

<script>
import SignIn from '@/views/auth/sign-in';

export default {
  name: 'StartIndex',
  methods: {
    start() {
      // TODO: 状態によってgoToTermsOfService、goToFirstGuidance、goToUserNewに分岐
      console.log('handleClickStart');
    },
    // goToTermsOfService() {
    //   console.log('goToTermsOfService');
    // },
    // goToFirstGuidance() {
    //   console.log('goToFirstGuidance');
    // },
    // goToUserNew() {
    //   console.log('goToAuth');
    // },
    goToAuth() {
      this.$store.dispatch('appNavigator/push', SignIn);
    },
  },
};

</script>
<style lang="scss" scoped>
.background {
  background-image: url('~@/assets/images/start/background.jpg');
  background-position: center;
  background-size: cover;
}

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
