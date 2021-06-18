<template>
  <v-ons-page>
    <custom-toolbar title="利用規約" />

    <v-ons-card :fullscreen="true">
      <terms-of-service-description />
    </v-ons-card>
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
};
</script>
