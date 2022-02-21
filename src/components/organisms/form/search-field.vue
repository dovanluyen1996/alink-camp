<template>
  <div class="search-field">
    <v-ons-search-input
      v-model="inputedValue"
      placeholder="キャンプ場名などを入力"
      class="search-form"
      @keyup.enter="searchByEnter"
    />
    <div class="search-button">
      <v-ons-button
        class="button-search-top"
        modifier="large rounded orange"
        @click="searchByName"
      >
        検索
      </v-ons-button>
    </div>

    <div class="search-detail-button">
      <v-ons-button
        modifier="large rounded"
        class="button--search-detail"
        @click="goToConditionsSearch"
      >
        こだわり条件で検索
      </v-ons-button>
    </div>

    <v-ons-alert-dialog
      :visible.sync="searchResultEmptyVisible"
    >
      <template #title>
        該当キャンプ場がありません
      </template>

      検索結果に該当するキャンプ場がありませんでした。お手数ですが条件を変えてお試しください。

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
// pages
import ConditionsSearch from '@/views/campsite-search/conditions-search';

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
      return this.$store.getters['models/campsite/size'];
    },
  },
  methods: {
    async searchByName() {
      // Clear before search result
      this.$store.dispatch('models/campsite/resetCampsites');

      const params = {
        name: this.inputedValue,
      };
      await this.$store.dispatch('models/campsite/getCampsites', params);

      if (this.recordCount) {
        // Send search condition params to paging in search result
        const searchConditions = { ...params, name: this.inputedValue };

        this.$emit('searched', searchConditions);
      } else {
        this.showSearchResultEmptyDialog();
      }
    },
    async searchByEnter(event) {
      event.target.blur();
      await this.searchByName();
    },
    closeSearchResultEmptyDialog() {
      this.searchResultEmptyVisible = false;
    },
    showSearchResultEmptyDialog() {
      this.searchResultEmptyVisible = true;
    },
    goToConditionsSearch() {
      this.$store.dispatch('campsiteSearchNavigator/push', ConditionsSearch);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-field {
  margin: 20px 20px 25px;
  text-align: center;
}

.search-button {
  margin: 0 10px;
}

.button-search-top {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 149px;

  &::before {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 6px;
    content: '';
    background-image: url("~@/assets/images/form/search-top.png");
    background-position: center;
  }
}

.search-detail-button {
  margin: 20px 10px;
}

.button--search-detail {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c83200;

  &::before {
    display: inline-block;
    width: 22px;
    height: 22px;
    margin-right: 6px;
    content: '';
    background-image: url("~@/assets/images/icon-sun.png");
    background-position: center;
    background-size: 100%;
  }
}

.search-form {
  width: 100%;
  margin-bottom: 20px;
}
</style>
