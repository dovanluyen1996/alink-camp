<template>
  <div class="search-field">
    <v-ons-search-input
      v-model="inputedValue"
      placeholder="コース名などを入力"
      class="search-form"
    />
    <v-ons-button
      modifier="large rounded"
      :disabled="isDisableSearchResult"
      @click="goToSearchResult"
    >
      {{ recordCount }}件の検索結果があります
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
  data() {
    return {
      isDisableSearchResult: true,
    };
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
    recordCount() {
      return this.$store.getters['models/course/size'];
    },
  },
  watch: {
    inputedValue() {
      // 検索条件
      if (this.inputedValue.length < 1) {
        this.clearSearchResult();
        return;
      }
      if (this.timeoutId) clearTimeout(this.timeoutId);

      this.timeoutId = setTimeout(() => {
        this.timeoutId = null;
        this.searchByName();
      }, 500);
    },
  },
  methods: {
    goToSearchResult() {
      this.$emit('goToSearchResult');
    },
    searchByName() {
      if (this.inputedValue.length < 1) {
        this.clearSearchResult();
        return;
      }

      const params = {
        name: this.inputedValue,
      };

      this.$store.dispatch('models/course/getCourses', params)
        .then(() => {
          this.isDisableSearchResult = this.recordCount > 0 ? false : true;
        });
    },
    clearSearchResult() {
      this.$store.dispatch('models/course/resetCourses');
      this.isDisableSearchResult = true;
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
