<template>
  <v-ons-alert-dialog
    :visible.sync="isVisible"
  >
    <template #title>
      {{ title }}
    </template>

    {{ errorMessage }}

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
export default {
  name: 'SignInErrorDialog',
  props: {
    isVisible: {
      type: Boolean,
      default: false,
      requier: true,
    },
    errorMessage: {
      type: String,
      default: '',
      requier: true,
    },
    title: {
      type: String,
      default: '',
      requier: true,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
};
</script>
