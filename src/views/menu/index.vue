<template>
  <v-ons-page>
    <p>メニュー</p>

    <v-ons-button @click="goToNotices">
      お知らせ
    </v-ons-button>

    <v-ons-button @click="goToHelps">
      ヘルプ&サポート
    </v-ons-button>
  </v-ons-page>
</template>

<script>
import HelpsView from '@/views/helps/index';
import NoticesView from '@/views/notices/index';

export default {
  methods: {
    goToHelps() {
      this.$store.dispatch('menuNavigator/push', HelpsView);
    },
    goToNotices() {
      this.$store.dispatch('menuNavigator/push', NoticesView);
    },
  },
};
</script>
