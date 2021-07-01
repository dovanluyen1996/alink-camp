<template>
  <v-ons-alert-dialog
    :visible.sync="isVisible"
  >
    <template #title>
      {{ errorTitle }}
    </template>

    <p
      v-for="(errorMessage, index) in errorMessages"
      :key="index"
      class="error-content"
    >
      {{ errorMessage }}
    </p>

    <template #footer>
      <v-ons-button
        @click="close()"
      >
        {{ buttonText }}
      </v-ons-button>
    </template>
  </v-ons-alert-dialog>
</template>

<script>
import SignIn from '@/views/auth/sign-in';
import PurchaseInformation from '@/views/purchase-information';

export default {
  name: 'ApiErrorDialog',
  data() {
    return {
      isVisible: false,
    };
  },
  computed: {
    error() {
      return this.$store.state.api.error;
    },
    errorStatus() {
      return this.error.status;
    },
    errorMessages() {
      return this.error.message ? this.error.message.split(',') : [];
    },
    errorTitle() {
      return this.isMaintainanceError ? 'メンテナンス中' : 'エラー';
    },
    buttonText() {
      return this.isMaintainanceError ? 'アプリを終了する' : 'OK';
    },
  },
  watch: {
    error(newValue) {
      this.isVisible = Object.keys(newValue).length !== 0;
    },
  },
  methods: {
    close() {
      this.isVisible = false;

      switch (this.errorStatus) {
      case 401:
        // TODO: fix Navigator error
        this.$store.dispatch('appNavigator/reset', SignIn);
        break;
      case 503:
        // TODO: fix Navigator error
        this.$store.dispatch('appNavigator/reset', PurchaseInformation);
        break;
      default:
        break;
      }

      this.$store.dispatch('api/resetError');
    },
    isMaintainanceError() {
      return this.errorStatus === 503;
    },
  },
};
</script>

<style lang="scss" scoped>
.error-content {
  margin: 0;
  white-space: pre-line;
}
</style>
