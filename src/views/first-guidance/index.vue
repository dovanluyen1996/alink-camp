<template>
  <v-ons-page>
    <custom-toolbar title="初回案内" />
    <div class="content">
      <v-ons-card>
        説明文
      </v-ons-card>

      <fixed-footer>
        <v-ons-button @click="goToLocationServices">
          次へ
        </v-ons-button>
      </fixed-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import FixedFooter from '@/components/organisms/fixed-footer';

// pages
import LocationServices from '@/views/first-guidance/location-services';

export default {
  name: 'FirstGuidance',
  components: {
    FixedFooter,
  },
  methods: {
    goToLocationServices() {
      this.$store.dispatch('appNavigator/push', LocationServices);
    },
  },
};
</script>
