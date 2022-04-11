<template>
  <v-ons-button
    modifier="yellow"
    class="button--share"
    @click="shareMessage"
  >
    <slot name="text" />
  </v-ons-button>
</template>

<script>
export default {
  props: {
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  methods: {
    shareMessage() {
      const options = {
        message: this.message, // not supported on some apps (Facebook, Instagram)
        subject: this.subject, // for email
      };
      const onSuccess = (result) => {
        console.log('SNS Sharing complete:', result.completed, result.app);
      };
      const onError = (message) => {
        console.error('SNS Sharing failed:', message);
      };

      window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
    },
  },

};
</script>

<style scoped lang="scss">
@import "@/assets/scss/_variables.scss";

.button--share {
  position: absolute;
  right: 7px;
  display: flex;
  align-items: center;
  height: 29px;
  padding: 0 12px 0 7px;
  font-weight: bold;
  border-radius: 15px;

  &::before {
    display: inline-block;
    width: 14px;
    min-width: 14px;
    height: 16px;
    margin-right: 6px;
    content: '';
    background-image: url("~@/assets/images/icon-share.png");
    background-position: center;
    background-size: 100%;
  }
}

@media screen and (max-width: 374px) {
  // NOTE: iPhoneSE 1stでタイトルとボタンが詰まらないようにする
  .button--share {
    font-size: $font-size-small;
  }
}
</style>
