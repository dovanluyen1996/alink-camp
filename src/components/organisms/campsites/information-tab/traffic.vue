<template>
  <information-tab-item>
    <template #title>
      交通アクセス
    </template>

    <template #content>
      <div class="content-body">
        {{ campsite.access }}
      </div>
    </template>
  </information-tab-item>
</template>

<script>
// components
import InformationTabItem from '@/components/atoms/information-tab/item';

export default {
  name: 'CampsitesInformationTraffic',
  computed: {
    campsite() {
      return this.$store.getters['campsite/choosenCampsite'];
    },
  },
  components: {
    InformationTabItem,
  },
};
</script>

<style scoped lang="scss">
.content-body {
  padding-bottom: 100px;
  margin-top: 15px;
}

.traffic-map {
  padding: 0 40px;
}

.image-temp {
  width: 100%;
  margin-top: 20px;
}

.button {
  &--custom-button {
    height: 25px;
    padding: 5px 20px;
    font-size: 12px;
    font-weight: 600;
    line-height: 15px;
    color: #fff;
    text-align: center;
    background-color: #c83200;
  }
}

.traffic-button {
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 10px;
}
</style>
