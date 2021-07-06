<template>
  <v-ons-page>
    <div class="content">
      <content-with-footer>
        <v-ons-card>
          月額案内1
        </v-ons-card>

        <v-ons-card>
          月額案内2
        </v-ons-card>

        <v-ons-card>
          月額案内3
        </v-ons-card>

        <v-ons-card>
          月額案内4
        </v-ons-card>

        <template #footer>
          <v-ons-button
            modifier="cta"
            class="call-to-purchase"
            @click="callToPurchase"
          >
            利用開始する<br>
            <small>（初月無料月額￥〇〇〇）</small>
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import ContentWithFooter from '@/components/organisms/content-with-footer';

// pages
import StartIndex from '@/views/start';

export default {
  name: 'PurchaseInformation',
  components: {
    ContentWithFooter,
  },
  methods: {
    callToPurchase() {
      // TODO: 仮でスタートページに飛ばしているので
      // サブスクリプションを呼んでください
      this.$store.dispatch('appNavigator/replace', StartIndex);
    },
  },
};
</script>

<style lang="scss" scoped>
.call-to-purchase {
  height: auto;
}
</style>
