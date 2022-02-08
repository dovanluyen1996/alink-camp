<template>
  <information-tab-item>
    <template #title>
      周辺施設
    </template>

    <template #content>
      <div class="content-body">
        カヌー &nbsp;&nbsp; {{ campsite.spotCanoe }} <br>
        釣り &nbsp;&nbsp; {{ campsite.spotFishing }} <br>
        トレッキング &nbsp;&nbsp; {{ campsite.spotTrekking }} <br>
        スターウォッチング &nbsp;&nbsp; {{ campsite.spotStarWatching }} <br>
        海水浴 &nbsp;&nbsp; {{ campsite.spotSeaBathing }} <br>
        水遊び &nbsp;&nbsp; {{ campsite.spotWaterplay }} <br>
        温泉 &nbsp;&nbsp; {{ campsite.spotHotSpring }} <br>
        観光牧場 &nbsp;&nbsp; {{ campsite.spotFarm }} <br>
        レジャー施設 &nbsp;&nbsp; {{ campsite.spotLeisure }}
      </div>
    </template>
  </information-tab-item>
</template>

<script>
// components
import InformationTabItem from '@/components/atoms/information-tab/item';

export default {
  name: 'CampsitesInformationNearbyFacility',
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
  margin-top: 15px;
}
</style>
