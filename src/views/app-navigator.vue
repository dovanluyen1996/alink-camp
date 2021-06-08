<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
  />
</template>

<script>
import AppTabbar from '@/views/app-tabbar';
import PurchaseInformation from '@/views/purchase-information';

export default {
  computed: {
    pageStack() {
      return this.$store.state.appNavigator.stack;
    },
    isSigned: () => false,
  },
  beforeCreate() {
    this.$store.dispatch('appNavigator/push', this.isSigned ? AppTabbar : PurchaseInformation);
  },
  methods: {
    popPage() {
      this.$store.dispatch('appNavigator/pop');
    },
  },
};
</script>
