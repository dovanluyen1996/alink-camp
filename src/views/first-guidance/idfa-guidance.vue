<template>
  <v-ons-page>
    <custom-toolbar title="初回案内" />
    <div class="content">
      <v-ons-card>
        idfaの説明文
      </v-ons-card>

      <fixed-footer>
        <v-ons-button @click="showIdfaAlert()">
          次へ
        </v-ons-button>
      </fixed-footer>

      <v-ons-alert-dialog
        modifier="rowfooter"
        :visible.sync="isShownIdfaAlert"
      >
        <template #title>
          ゴルフ天気にアプリとWEBの操作履歴の利用を許可しますか？
        </template>
        許可の設定により、今後も各種機能改善のご参考にさせていただきます。次へのボタン押下後のポップアップで選択してください
        <template #footer>
          <v-ons-button @click="callToIdfaDialog()">
            次へ
          </v-ons-button>
        </template>
      </v-ons-alert-dialog>
    </div>
  </v-ons-page>
</template>

<script>
// components
import FixedFooter from '@/components/organisms/fixed-footer';

export default {
  name: 'FirstGuidanceIDFA',
  components: {
    FixedFooter,
  },
  data() {
    return {
      carouselIndex: 0,
      isShownIdfaAlert: false,
    };
  },
  methods: {
    goToUserNew() {
      console.log('goToUserNew');
    },
    showIdfaAlert() {
      this.isShownIdfaAlert = true;
    },
    callToIdfaDialog() {
      this.isShownIdfaAlert = false;
      // TODO: IDFAのダイアログを出してください
      console.log('callToIdfaDialog');
    },
  },
};
</script>
