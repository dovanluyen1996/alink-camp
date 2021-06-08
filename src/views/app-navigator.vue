<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
  />
</template>

<script>
import AppTabbar from '@/views/signed/app-tabbar';
import PurchaseInfo from '@/views/unsigned/purchase-info';

export default {
  computed: {
    pageStack() {
      return this.$store.state.appNavigator.stack;
    },
    isSigned: () => false,
  },
  beforeCreate() {
    this.$store.dispatch('appNavigator/push', this.isSigned ? AppTabbar : PurchaseInfo);
  },
  methods: {
    popPage() {
      this.$store.dispatch('appNavigator/pop');
    },
  },
};
</script>
