<template>
  <v-ons-page>
    <p>メニュー</p>

    <v-ons-button @click="goToNotices">
      お知らせ
    </v-ons-button>

    <v-ons-button @click="goToGifts">
      特典交換
    </v-ons-button>

    <v-ons-button @click="goToHelps">
      ヘルプ&サポート
    </v-ons-button>

    <v-ons-button @click="goPrivacyPolicy">
      プライバシーポリシー
    </v-ons-button>
  </v-ons-page>
</template>

<script>
import HelpsView from '@/views/helps/index';
import NoticesView from '@/views/notices/index';
import GiftsView from '@/views/gifts/index';
import PrivacyPolicyView from '@/views/privacy-policy/index.vue';

export default {
  methods: {
    goToHelps() {
      this.$store.dispatch('menuNavigator/push', HelpsView);
    },
    goToNotices() {
      this.$store.dispatch('menuNavigator/push', NoticesView);
    },
    goToGifts() {
      this.$store.dispatch('menuNavigator/push', GiftsView);
    },
    goPrivacyPolicy() {
      this.$store.dispatch('menuNavigator/push', PrivacyPolicyView);
    },
  },
};
</script>
