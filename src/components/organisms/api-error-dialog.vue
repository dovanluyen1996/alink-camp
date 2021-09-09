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
        OK
      </v-ons-button>
    </template>
  </v-ons-alert-dialog>
</template>

<script>
import StartIndex from '@/views/start';
import settings from '@/config/settings';

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
      if (this.isMaintainanceError) {
        return 'メンテナンス中';
      } if (this.isTicketNotEnoughError) {
        return 'チケット不足';
      }
      return 'エラー';
    },
    isMaintainanceError() {
      return this.errorStatus === 503;
    },
    isUnauthorizedError() {
      return this.errorStatus === 401;
    },
    isVersionInvalidError() {
      return this.errorStatus === 600;
    },
    isTicketNotEnoughError() {
      return this.error.message && this.error.message.includes('チケットが不足しています。');
    },
  },
  watch: {
    error(newValue) {
      this.isVisible = Object.keys(newValue).length !== 0;
    },
  },
  methods: {
    async close() {
      if (this.isMaintainanceError) {
        await this.$store.dispatch('models/appStart/getAppStart');
      }

      this.isVisible = false;

      if (this.isUnauthorizedError) {
        this.resetNavigators();
      }
      if (this.isVersionInvalidError) {
        this.resetNavigators();

        const { platform } = window.device || {};

        const url = platform === 'iOS' ? settings.app_store.ios : settings.app_store.android;
        setTimeout(() => {
          window.open(url, '_system');
        }, 1000);
      }

      this.$store.dispatch('api/resetError');
    },
    resetNavigators() {
      this.$store.dispatch('appNavigator/reset', StartIndex);
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
