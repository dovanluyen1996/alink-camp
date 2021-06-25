<template>
  <div>
    <app-navigator />
    <api-error-dialog />
  </div>
</template>

<script>
import AppNavigator from '@/views/app-navigator';
import ApiErrorDialog from '@/components/organisms/api-error-dialog';

export default {
  name: 'App',
  components: {
    AppNavigator,
    ApiErrorDialog,
  },
};
</script>
