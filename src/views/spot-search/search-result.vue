<template>
  <v-ons-page
    :infinite-scroll="search"
    @show="show"
  >
    <custom-toolbar :title="周辺検索" />
    <div class="content">
      <no-data v-if="spots.length === 0">
        条件に合う周辺情報が見つかりません
      </no-data>

      <spot-list
        v-else
        :spots="spots"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import NoData from '@/components/organisms/no-data';
import SpotList from '@/components/organisms/spot-list';

export default {
  name: 'SpotSearchResult',
  components: {
    NoData,
    SpotList,
  },
  props: {
    location: {
      type: Object,
      default: () => null,
    },
  },
  data() {
    return {
      page: 1,
    };
  },
  computed: {
    spots() {
      return this.$store.getters['models/spot/all'];
    },
    totalCount() {
      return this.$store.getters['models/spots/totalCount'];
    },
  },
  methods: {
    async search(done) {
      // if getted spots is the same with total count, finish paging
      if (this.totalCount === this.$store.getters['models/spot/size']) {
        if (done) done();
        return;
      }

      const searchParams = {
        latitude: this.location.latitude,
        longitude: this.location.longitude,
        page: this.page,
      };

      await this.$store.dispatch('models/spot/getSpots', searchParams)
        .then(() => {
          this.page += 1;
          if (done) done();
        });
    },
    async show() {
      this.$store.dispatch('appTabbar/setLastVisitedAt', this.$helpers.localDateWithHyphenFrom(new Date()));

      const searchParams = {
        latitude: this.location.latitude,
        longitude: this.location.longitude,
        page: this.page,
      };

      await this.$store.dispatch('models/spot/getSpots', searchParams)
        .then(() => {
          this.page += 1;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.search-result {
  &__campsite {
    padding: 5px 20px;
    background-color: #fff;
  }

  &__campsite-name {
    margin-left: 20px;
    font-size: 18px;
    font-weight: 300;
  }
}

/deep/ {
  .list-item {
    border-bottom: 1px solid #d9d9d9;

    &__title {
      font-size: 18px;
      font-weight: 300;
    }

    &__subtitle {
      font-weight: 300;
      color: #00000080;
    }
  }
}
</style>
