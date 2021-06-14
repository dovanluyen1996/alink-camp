<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button />
      </div>
      <div class="center">
        {{ notice.title }}
      </div>
    </v-ons-toolbar>
    <v-ons-card>
      <div>
        <div>
          <img :src="notice.image">
        </div>
        <div>
          {{ notice.startedAt }}
        </div>
        <div>
          {{ notice.description }}
        </div>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
export default {
  computed: {
    // TODO: get notice from store by id
    notice() {
      return {
        id: 1,
        title: 'Notice 1',
        description: 'Notice 1',
        image: 'https://via.placeholder.com/150',
        started_at: '2020-02-02 11:11',
      };
    },
  },
};
</script>
