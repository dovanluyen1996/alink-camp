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
      return this.isMaintainanceError ? 'メンテナンス中' : 'エラー';
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
  },
  watch: {
    error(newValue) {
      this.isVisible = Object.keys(newValue).length !== 0;
    },
  },
  methods: {
    close() {
      this.isVisible = false;

      if (this.isMaintainanceError || this.isUnauthorizedError) {
        // TODO: fix Navigator error
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
      this.$store.dispatch('appNavigator/clear');
      this.$store.dispatch('courseWeatherNavigator/clear');
      this.$store.dispatch('courseSearchNavigator/clear');
      this.$store.dispatch('menuNavigator/clear');
      this.$store.dispatch('scoresNavigator/clear');
      this.$store.dispatch('windForecastNavigator/clear');
      this.$store.commit('appTabbar/setActiveIndex', 0);

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
