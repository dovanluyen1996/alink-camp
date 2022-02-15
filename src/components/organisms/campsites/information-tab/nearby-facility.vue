<template>
  <information-tab-item>
    <template #title>
      周辺施設
    </template>

    <template #content>
      <div class="content-body">
        カヌー &nbsp;&nbsp; {{ campsite.spotCanoe === 1 ? 'あり' : 'なし' }} <br>
        釣り &nbsp;&nbsp; {{ campsite.spotFishing === 1 ? 'あり' : 'なし' }} <br>
        トレッキング &nbsp;&nbsp; {{ campsite.spotTrekking === 1 ? 'あり' : 'なし' }} <br>
        スターウォッチング &nbsp;&nbsp; {{ campsite.spotStarWatching === 1 ? 'あり' : 'なし' }} <br>
        バードウォッチング &nbsp;&nbsp; {{ campsite.spotBirdWatching === 1 ? 'あり' : 'なし' }} <br>
        海水浴 &nbsp;&nbsp; {{ campsite.spotSeaBathing === 1 ? 'あり' : 'なし' }} <br>
        水遊び &nbsp;&nbsp; {{ campsite.spotWaterplay === 1 ? 'あり' : 'なし' }} <br>
        温泉 &nbsp;&nbsp; {{ campsite.spotHotSpring === 1 ? 'あり' : 'なし' }} <br>
        観光牧場 &nbsp;&nbsp; {{ campsite.spotFarm === 1 ? 'あり' : 'なし' }} <br>
        レジャー施設 &nbsp;&nbsp; {{ campsite.spotLeisure === 1 ? 'あり' : 'なし' }}
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
