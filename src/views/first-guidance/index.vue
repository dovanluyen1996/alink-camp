<template>
  <v-ons-page>
    <custom-toolbar title="初回案内" />

    <div class="content">
      <content-with-footer>
        <v-ons-card>
          説明文
        </v-ons-card>

        <template #footer>
          <v-ons-button @click="goToLocationServices">
            次へ
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import ContentWithFooter from '@/components/organisms/content-with-footer';

// pages
import LocationServices from '@/views/first-guidance/location-services';

export default {
  name: 'FirstGuidance',
  components: {
    ContentWithFooter,
  },
  methods: {
    goToLocationServices() {
      this.$store.dispatch('appNavigator/push', LocationServices);
    },
  },
};
</script>
