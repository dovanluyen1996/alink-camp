<template>
  <div class="using-note">
    <div class="using-note__content">
      （本アプリ利用上の留意事項）<br><br>
      本アプリで提供する「ゴルフ場のピンポイント天気予報」（以下、「本情報」といいます）は、
      気象庁から配信される観測・予想資料を基に、
      一般社団法人日本気象協会が気象学的解析に基づき独自に提供する情報から作成しています。
      本情報には気象学的予測等を含むため予測誤差が生じるとともに、
      予測が短時間で変化する可能性があります。
      実際の気象状態や気象庁発表の警報・注意報と異なる場合があるので、
      利用者は常に最新の気象情報の確認とともに、
      現地情報や状況等を考慮してご自身の判断で行動してください。
    </div>
    <div class="using-note__links">
      <v-ons-button
        modifier="quiet"
        @click="goToTermOfService()"
      >
        利用規約
      </v-ons-button>
      <v-ons-button
        modifier="quiet"
        @click="goToPolicy()"
      >
        プライバシーポリシー
      </v-ons-button>
      <v-ons-button
        modifier="quiet"
        @click="goToAboutSubcription()"
      >
        定期購読について
      </v-ons-button>
    </div>
  </div>
</template>

<script>
import TermsOfServiceView from '@/views/terms-of-service/index';
import PrivacyPolicyView from '@/views/privacy-policy/index';
import AboutSubscriptionView from '@/views/about-subscription/index';

export default {
  name: 'UsingNote',
  methods: {
    goToTermOfService() {
      this.$store.dispatch('appNavigator/push', TermsOfServiceView);
    },
    goToPolicy() {
      this.$store.dispatch('appNavigator/push', PrivacyPolicyView);
    },
    goToAboutSubcription() {
      this.$store.dispatch('appNavigator/push', AboutSubscriptionView);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.using-note {
  background-color: #edebeb;

  &__content {
    padding: 22px;
    font-size: 16px;
    font-weight: 300;
    line-height: 1.7;
  }

  &__links {
    padding: 0 22px 16px 22px;

    /deep/ {
      .button[class*="button--quiet"] {
        height: auto;
        padding: 0 8px 0 0;
        font-size: 14px;
        font-weight: 600;
        line-height: 1.7;
        color: #000;
        text-decoration: underline;
      }
    }
  }
}

</style>
