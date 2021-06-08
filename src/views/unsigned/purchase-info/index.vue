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
import FixedFooter from '@/components/organisms/fixed-footer';

export default {
  components: {
    FixedFooter,
  },
  methods: {
    callToPurchase() {
      console.log('callToPurchase');
    },
  },
};
</script>

<style lang="scss" scoped>
.call-to-purchase {
  height: auto;
}
</style>
