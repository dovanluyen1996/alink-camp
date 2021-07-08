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
        this.$store.dispatch('appNavigator/reset', StartIndex);
      }

      this.$store.dispatch('api/resetError');
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
