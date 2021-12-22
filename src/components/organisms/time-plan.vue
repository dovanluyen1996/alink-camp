<template>
  <v-ons-card>
    <v-ons-list modifier="noborder">
      <p class="list__title">終了前の計画</p>
      <v-ons-list-item
        modifier="longdivider chevron"
        @click="clickPrefecture(prefecture)"
      >
        <div class="center">
          <span class="list-item__title">2021/11/30（金）</span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item
        modifier="longdivider chevron"
        @click="clickPrefecture(prefecture)"
      >
        <div class="center">
          <span class="list-item__title">2021/11/30（金）</span>
        </div>
      </v-ons-list-item>
    </v-ons-list>

    <v-ons-list modifier="noborder">
      <p class="list__title">過去の計画</p>
      <v-ons-list-item
        modifier="longdivider chevron"
        @click="clickPrefecture(prefecture)"
      >
        <div class="center">
          <span class="list-item__title">2021/11/30（金）</span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item
        modifier="longdivider chevron"
        @click="clickPrefecture(prefecture)"
      >
        <div class="center">
          <span class="list-item__title">2021/11/30（金）</span>
        </div>
      </v-ons-list-item>
      <v-ons-list-item
        modifier="longdivider chevron"
        @click="clickPrefecture(prefecture)"
      >
        <div class="center">
          <span class="list-item__title">2021/11/30（金）</span>
        </div>
      </v-ons-list-item>
    </v-ons-list>
  </v-ons-card>
</template>

<script>

export default {
  name: 'TimePlan',
  data() {
  },
  methods: {
    
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

::v-deep {
  .card {
    text-align: center;
    padding-top: 5px;
    padding-bottom: 0;
  }
  .list {
    &__title {
      font-size: 18px;
      font-weight: 600;
    }
  }
}

.center {
  padding-top: 20px;
  padding-bottom: 20px;
}

.list-item {
  border-bottom: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;

  &__title {
    text-align: center;
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
