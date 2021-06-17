<template>
  <v-ons-page>
    <div class="background" />

    <div class="content">
      <v-ons-list>
        <v-ons-list-item
          modifier="nodivider chevron"
          @click="goToNotices"
        >
          お知らせ
        </v-ons-list-item>

        <v-ons-list-item
          modifier="nodivider chevron"
          @click="goToGifts"
        >
          特典交換
        </v-ons-list-item>

        <v-ons-list-item
          modifier="nodivider chevron"
          @click="goToHelps"
        >
          ヘルプ&amp;サポート
        </v-ons-list-item>

        <v-ons-list-item
          modifier="nodivider chevron"
          @click="goPrivacyPolicy"
        >
          プライバシーポリシー
        </v-ons-list-item>

        <v-ons-list-item
          modifier="nodivider chevron"
          @click="goToUserSetting"
        >
          設定
        </v-ons-list-item>

      </v-ons-list>
    </div>
  </v-ons-page>
</template>

<script>
// pages
import HelpsView from '@/views/helps/index';
import NoticesView from '@/views/notices/index';
import GiftsView from '@/views/gifts/index';
import PrivacyPolicyView from '@/views/privacy-policy/index.vue';
import UserSettingView from '@/views/user-setting/index';

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
    goToUserSetting() {
      this.$store.dispatch('menuNavigator/push', UserSettingView);
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  background: #299025;
}

.content {
  display: flex;
  align-items: center;
}

.list {
  width: 100%;
  max-height: 100%;
  padding-left: 40px;
  overflow: auto;
  background: transparent;
}

.list-item {
  font-weight: 600;
  color: #fff;

  &--chevron::before,
  &__expand-chevron {
    border-right-color: #fff;
    border-bottom-color: #fff;
  }
}
</style>
