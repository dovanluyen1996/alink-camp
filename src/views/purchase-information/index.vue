<template>
  <v-ons-page>
    <div class="content">
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
    </div>

    <fixed-footer>
      <v-ons-button
        modifier="cta"
        class="call-to-purchase"
        @click="callToPurchase"
      >
        利用開始する<br>
        <small>（初月無料月額￥〇〇〇）</small>
      </v-ons-button>
    </fixed-footer>
  </v-ons-page>
</template>

<script>
// components
import FixedFooter from '@/components/organisms/fixed-footer';

// pages
import StartIndex from '@/views/start';

export default {
  name: 'PurchaseInformation',
  components: {
    FixedFooter,
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
