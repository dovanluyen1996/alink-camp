<template>
  <v-ons-card>
    <v-ons-list modifier="noborder">
      <v-ons-list-item
        v-for="prefecture in prefectures"
        :key="prefecture.id"
        modifier="longdivider chevron"
        @click="clickPrefecture(prefecture)"
      >
        <div class="center">
          <span class="list-item__title">{{ prefecture.text }}</span>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-card>
</template>

<script>
import settings from '@/config/settings';

export default {
  name: 'PrefectureList',
  data() {
    return {
      prefectures: settings.views.prefectures,
    };
  },
  methods: {
    clickPrefecture(prefecture) {
      this.$emit('click', prefecture);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

/deep/ {
  .card {
    padding-top: 5px;
    padding-bottom: 0;
  }
}

.center {
  padding-top: 20px;
  padding-bottom: 20px;
}

.list-item {
  &__title {
    margin-bottom: 5px;
    font-size: 18px;
    line-height: 1.2;
  }

  &__subtitle {
    font-size: $font-size-small;
    color: $color-subtext;
  }
}
</style>
