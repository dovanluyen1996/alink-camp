<template>
  <v-ons-alert-dialog
    :visible.sync="isVisible"
  >
    <template #title>
      エラー
    </template>

    <p
      v-for="(errorMessage, index) in errorMessages"
      :key="index"
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
import SignIn from '@/views/auth/sign-in';

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
        // TODO: handle maintenance
        break;
      default:
        break;
      }

      this.$store.dispatch('api/resetError');
    },
  },
};
</script>
