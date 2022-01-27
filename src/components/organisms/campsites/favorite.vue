<template>
  <img
    v-if="isFavorite"
    src="@/assets/images/bookmark.png"
    @click="unfavorite"
  >
  <img
    v-else
    src="@/assets/images/gray-bookmark.png"
    @click="favorite"
  >
</template>

<script>
export default {
  name: 'FavoriteCampsite',
  props: {
    campsite: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isFavorite() {
      return this.$store.getters['models/usersFavorite/findByCampsiteId'](this.campsite.id);
    },
  },
  methods: {
    favorite() {
      return this.$store.dispatch('models/usersFavorite/createUsersFavorite', { campsiteId: this.campsite.id });
    },
    unfavorite() {
      return this.$store.dispatch('models/usersFavorite/deleteUsersFavorite', { campsiteId: this.campsite.id });
    },
  },
};
</script>
