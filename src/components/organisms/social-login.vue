<template>
  <div class="social-login">
    <div class="social-login-title">
      他サービスでログイン
    </div>
    <v-ons-card v-for="(service, index) in services">
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
export default {
  inject: ['navigator'],
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
          image: require('@/assets/images/social/yahoo.png'),
        },
        {
          name: 'Google',
          image: require('@/assets/images/social/google.png'),
        },
        {
          name: 'Twitter',
          image: require('@/assets/images/social/twitter.png'),
        },
        {
          name: 'Facobook',
          image: require('@/assets/images/social/facebook.png'),
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
  margin-left: 13px;
  margin-right: 13px;
}
.social-login-title {
  width: 100%;
  margin-bottom: 30px;
  // TODO: mixin化したい
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
.social-login-image {
  width: 32px;
  margin-bottom: 9px;
}
.card {
  width: calc(50% - 15px);
  margin: 0 7px 15px;
  padding: 10px 0 15px;
  text-align: center;
  font-weight: 600;
  line-height: 1;
}
</style>
