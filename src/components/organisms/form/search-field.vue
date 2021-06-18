<template>
  <div class="search-field">
    <v-ons-search-input
      v-model="inputedValue"
      placeholder="コース名などを入力"
      class="search-form"
    />
    <v-ons-button
      modifier="large rounded"
      @click="goToSearchResult"
    >
      12345件の検索結果があります
    </v-ons-button>
  </div>
</template>

<script>
export default {
  name: 'SearchField',
  props: {
    value: {
      type: String,
      default: '',
      required: true,
    },
  },
  computed: {
    inputedValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit('input', newValue);
      },
    },
  },
  methods: {
    goToSearchResult() {
      this.$emit('goToSearchResult');
    },
  },
};
</script>

<style lang="scss" scoped>
.search-field {
  margin: 20px 20px 45px;
}

.search-form {
  width: 100%;
  margin-bottom: 20px;
}
</style>
