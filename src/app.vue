<template>
  <div>
    <app-navigator />
    <api-error-dialog />
    <purchase-error-dialog />
  </div>
</template>

<script>
import AppNavigator from '@/views/app-navigator';
import ApiErrorDialog from '@/components/organisms/api-error-dialog';
import PurchaseErrorDialog from '@/components/organisms/purchase-error-dialog';

export default {
  name: 'App',
  components: {
    AppNavigator,
    ApiErrorDialog,
    PurchaseErrorDialog,
  },
};
</script>
