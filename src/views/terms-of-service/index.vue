<template>
  <v-ons-page>
    <custom-toolbar title="利用規約" />
    <loading :visible="isLoading" />
    <div class="content">
      <v-ons-card fullscreen>
        <terms-of-service-description />
      </v-ons-card>
    </div>
  </v-ons-page>
</template>

<script>
// components
import TermsOfServiceDescription from '@/components/organisms/terms-of-service/description';

export default {
  name: 'TermsOfServiceSigned',
  components: {
    TermsOfServiceDescription,
  },
  computed: {
    isLoading() {
      return this.$store.getters['models/termsOfService/isLoading'];
    },
  },
};
</script>
