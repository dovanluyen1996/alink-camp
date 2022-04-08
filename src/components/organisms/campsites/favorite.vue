<template>
  <img
    v-if="isFavorite"
    src="@/assets/images/bookmark.png"
    width="34px"
    height="34px"
    @click="unfavorite"
  >
  <img
    v-else
    src="@/assets/images/gray-bookmark.png"
    width="34px"
    height="34px"
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
  data() {
    return {
      preventDoubleSubmit: false,
    };
  },
  computed: {
    isFavorite() {
      return this.$store.getters['models/usersFavorite/findByCampsiteId'](this.campsite.id);
    },
  },
  methods: {
    async favorite() {
      if (this.preventDoubleSubmit) return;

      try {
        this.preventDoubleSubmit = true;
        await this.$store.dispatch('models/usersFavorite/createUsersFavorite', { campsiteId: this.campsite.id });
      } finally {
        this.preventDoubleSubmit = false;
      }
    },
    async unfavorite() {
      if (this.preventDoubleSubmit) return;

      try {
        this.preventDoubleSubmit = true;
        await this.$store.dispatch('models/usersFavorite/deleteUsersFavorite', { campsiteId: this.campsite.id });
      } finally {
        this.preventDoubleSubmit = false;
      }
    },
  },
};
</script>
