<template>
  <v-ons-page>
    <custom-toolbar title="メニュー" :disabled-back-button="true" />

    <div class="background" />

    <div class="content">
      <v-ons-list>
        <v-ons-list-item
          v-if="!isPurchased"
          modifier="nodivider chevron"
          @click="goToPurchaseInformation"
        >
          キャンプ天気会員登録
        </v-ons-list-item>

        <v-ons-list-item modifier="nodivider chevron" @click="goToNotices">
          お知らせ
        </v-ons-list-item>

        <v-ons-list-item modifier="nodivider chevron" @click="goToGifts">
          特典交換
        </v-ons-list-item>

        <v-ons-list-item modifier="nodivider chevron" @click="goToUserSetting">
          設定
        </v-ons-list-item>

        <v-ons-list-item modifier="nodivider chevron" @click="goToHelps">
          ヘルプ&amp;サポート
        </v-ons-list-item>

        <v-ons-list-item modifier="nodivider chevron" @click="goToItems">
          アイテム設定
        </v-ons-list-item>

        <v-ons-list-item modifier="nodivider chevron" @click="goToUserEdit">
          データ引継ぎ設定
        </v-ons-list-item>

        <v-ons-list-item
          modifier="nodivider chevron"
          @click="goToTermsOfService"
        >
          利用規約
        </v-ons-list-item>

        <v-ons-list-item modifier="nodivider chevron" @click="goPrivacyPolicy">
          プライバシーポリシー
        </v-ons-list-item>

        <v-ons-list-item
          modifier="nodivider chevron"
          @click="goToAboutSubscription"
        >
          定期購読に関して
        </v-ons-list-item>

        <v-ons-list-item modifier="nodivider chevron" @click="goToScreenTest">
          Screen Test
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </v-ons-page>
</template>

<script>
// pages
import PurchaseInformation from "@/views/purchase-information/index";
import NoticesView from "@/views/notices/index";
import GiftsView from "@/views/gifts/index";
import UserSettingView from "@/views/user-setting/index";
import HelpsView from "@/views/helps/index";
import UserEdit from "@/views/user/edit";
import PrivacyPolicyView from "@/views/privacy-policy/index.vue";
import TermsOfServiceView from "@/views/terms-of-service/index";
import AboutSubscriptionView from "@/views/about-subscription/index";
import ScreenTest from "@/views/screen-test/index";
import ItemsView from "@/views/items/index";

export default {
  computed: {
    isPurchased() {
      return this.$store.getters["purchase/isPurchased"];
    },
  },
  methods: {
    goToPurchaseInformation() {
      this.$store.dispatch("menuNavigator/push", PurchaseInformation);
    },
    goToNotices() {
      this.$store.dispatch("menuNavigator/push", NoticesView);
    },
    goToGifts() {
      this.$store.dispatch("menuNavigator/push", GiftsView);
    },
    goToHelps() {
      this.$store.dispatch("menuNavigator/push", HelpsView);
    },
    goToUserEdit() {
      this.$store.dispatch("menuNavigator/push", UserEdit);
    },
    goToUserSetting() {
      this.$store.dispatch("menuNavigator/push", UserSettingView);
    },
    goPrivacyPolicy() {
      this.$store.dispatch("menuNavigator/push", PrivacyPolicyView);
    },
    goToTermsOfService() {
      this.$store.dispatch("menuNavigator/push", TermsOfServiceView);
    },
    goToAboutSubscription() {
      this.$store.dispatch("menuNavigator/push", AboutSubscriptionView);
    },
    goToItems() {
      this.$store.dispatch("menuNavigator/push", ItemsView);
    },
    goToScreenTest() {
      this.$store.dispatch("menuNavigator/push", ScreenTest);
      console.log("Do van luyen test nhe");
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  background: #f2ebd3;
}

.content {
  display: flex;
  align-items: center;
}

.list {
  width: 100%;
  max-height: 100%;
  padding-left: 26px;
  overflow: auto;
  background: transparent;
}

.list-item {
  padding-left: 0;
  font-weight: bold;
  color: #000;

  &--chevron::before,
  &__expand-chevron {
    right: 26px !important;
    border-right-color: #000;
    border-bottom-color: #000;
  }
}
</style>
