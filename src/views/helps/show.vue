<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button />
      </div>
      <div class="center">
        {{ help.title }}
      </div>
    </v-ons-toolbar>
    <v-ons-card>
      <div>
        <div>
          <img :src="help.image.url">
        </div>
        <div>
          {{ help.description }}
        </div>
      </div>
    </v-ons-card>
  </v-ons-page>
</template>
<script>
export default {
  props: {
    helpId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    // TODO: get help from store by helpId
    help() {
      return {
        id: 1,
        title: 'Help 1',
        description: 'Help 1',
        image: {
          url: 'https://via.placeholder.com/150',
        },
      };
    },
  },
};
</script>
