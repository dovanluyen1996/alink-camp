<template>
  <div class="social-login">
    <div class="social-login-title">
      他サービスでログイン
    </div>
    <v-ons-card
      v-for="(service, index) in services"
      :key="index"
    >
      <img
        :src="service.image"
        class="social-login-image"
      >
      <div class="social-login-name">
        {{ service.name }}
      </div>
    </v-ons-card>
  </div>
</template>

<script>
const YahooImage = require('@/assets/images/social/yahoo.png');
const GoogleImage = require('@/assets/images/social/google.png');
const TwitterImage = require('@/assets/images/social/twitter.png');
const FacebookImage = require('@/assets/images/social/facebook.png');

export default {
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      services: [
        {
          name: 'Yahoo! JAPAN',
          image: YahooImage,
        },
        {
          name: 'Google',
          image: GoogleImage,
        },
        {
          name: 'Twitter',
          image: TwitterImage,
        },
        {
          name: 'Facobook',
          image: FacebookImage,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.social-login {
  display: flex;
  flex-wrap: wrap;
  margin-right: 13px;
  margin-left: 13px;
}

.social-login-title {
  width: 100%;
  margin-bottom: 30px;
  // TODO: タイトル系のスタイルをmixin化したい
  font-size: 18px;
  font-weight: 600;
  text-align: center;
}

.social-login-image {
  width: 32px;
  margin-bottom: 9px;
}

.card {
  width: calc(50% - 15px);
  padding: 10px 0 15px;
  margin: 0 7px 15px;
  font-weight: 600;
  line-height: 1;
  text-align: center;
}
</style>