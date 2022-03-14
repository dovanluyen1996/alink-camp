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
</style>
