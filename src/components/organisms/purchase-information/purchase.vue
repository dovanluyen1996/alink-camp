<template>
  <div class="purchase">
    <div class="purchase__content">
      利用を開始する<br>
      <span>（初月無料月額￥360）</span>
      <v-ons-button
        modifier="large--cta rounded"
        @click="renew()"
      >
        以前購入した方はこちらから復元
      </v-ons-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Purchase',
  methods: {
    renew() {
      console.log('renew clicked');
      // TODO: Add event for「以前購入した方はこちらから復元」button
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.purchase {
  padding: 4px 0;
  background-color: #fff;

  &__content {
    padding: 20px 25px;
    font-size: 30px;
    font-weight: 600;
    color: #fff;
    text-align: center;
    background-color: $color-orange;

    span {
      font-size: 20px;
    }

    .button {
      margin-top: 22px;
    }

    /deep/ {
      .button[class*="button--large--cta"] {
        height: 44px;
        margin-top: 22px;
        line-height: 36px;
        color: #fff;
        background-color: #9f9a97;
        border-radius: 30px;
      }
    }
  }
}

</style>
