<template>
  <information-tab-item>
    <template #title>
      周辺施設
    </template>

    <template #content>
      <div class="content-body">
        <content-status-item>
          <template #text>
            カヌー
          </template>
          <template #status>
            {{ campsite.spotCanoe === 1 ? 'あり' : 'なし' }}
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            釣り
          </template>
          <template #status>
            {{ campsite.spotFishing === 1 ? 'あり' : 'なし' }}
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            トレッキング
          </template>
          <template #status>
            {{ campsite.spotTrekking === 1 ? 'あり' : 'なし' }}
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            スターウォッチング
          </template>
          <template #status>
            {{ campsite.spotStarWatching === 1 ? 'あり' : 'なし' }}
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            バードウォッチング
          </template>
          <template #status>
            {{ campsite.spotBirdWatching === 1 ? 'あり' : 'なし' }}
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            海水浴
          </template>
          <template #status>
            {{ campsite.spotSeaBathing === 1 ? 'あり' : 'なし' }}
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            水遊び
          </template>
          <template #status>
            {{ campsite.spotWaterplay === 1 ? 'あり' : 'なし' }}
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            温泉
          </template>
          <template #status>
            {{ campsite.spotHotSpring === 1 ? 'あり' : 'なし' }}
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            観光牧場
          </template>
          <template #status>
            {{ campsite.spotFarm === 1 ? 'あり' : 'なし' }}
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            レジャー施設
          </template>
          <template #status>
            {{ campsite.spotLeisure === 1 ? 'あり' : 'なし' }}
          </template>
        </content-status-item>
      </div>
    </template>
  </information-tab-item>
</template>

<script>
// components
import InformationTabItem from '@/components/atoms/information-tab/item';
import ContentStatusItem from '@/components/atoms/information-tab/content-status-item';

export default {
  name: 'CampsitesInformationNearbyFacility',
  computed: {
    campsite() {
      return this.$store.getters['campsite/choosenCampsite'];
    },
  },
  components: {
    InformationTabItem,
    ContentStatusItem,
  },
};
</script>

<style scoped lang="scss">
.content-body {
  margin-top: 15px;
}
</style>
