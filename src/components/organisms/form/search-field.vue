<template>
  <div class="search-field">
    <v-ons-search-input
      v-model="inputedValue"
      placeholder="コース名などを入力"
      class="search-form"
    />
    <v-ons-button
      modifier="large rounded"
      @click="searchByName"
    >
      検索する
    </v-ons-button>

    <v-ons-alert-dialog
      :visible.sync="searchResultEmptyVisible"
    >
      <template #title>
        該当するコースがありません
      </template>

      検索した結果、条件に合うゴルフコースがありませんでした。<br>
      お手数ですが、再度検索条件を設定してください。

      <template #footer>
        <v-ons-button
          @click="closeSearchResultEmptyDialog()"
        >
          OK
        </v-ons-button>
      </template>
    </v-ons-alert-dialog>
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
      searchResultEmptyVisible: false,
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
  methods: {
    async searchByName() {
      // If search textbox is empty, don't do anything
      if (this.inputedValue.length < 1) return;

      const params = {
        name: this.inputedValue,
      };
      await this.$store.dispatch('models/course/getCourses', params);

      if (this.recordCount) {
        this.$emit('goToSearchResult');
      } else {
        this.showSearchResultEmptyDialog();
        this.clearSearchResult();
      }
    },
    clearSearchResult() {
      this.$store.dispatch('models/course/resetCourses');
    },
    closeSearchResultEmptyDialog() {
      this.searchResultEmptyVisible = false;
    },
    showSearchResultEmptyDialog() {
      this.searchResultEmptyVisible = true;
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
