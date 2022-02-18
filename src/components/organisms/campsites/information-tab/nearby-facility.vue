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
            あり
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            釣り
          </template>
          <template #status>
            なし
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            トレッキング
          </template>
          <template #status>
            あり
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            スターウォッチング
          </template>
          <template #status>
            なし
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            バードウォッチング
          </template>
          <template #status>
            あり
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            海水浴
          </template>
          <template #status>
            なし
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            水遊び
          </template>
          <template #status>
            あり
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            温泉
          </template>
          <template #status>
            なし
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            観光牧場
          </template>
          <template #status>
            あり
          </template>
        </content-status-item>

        <content-status-item>
          <template #text>
            レジャー施設
          </template>
          <template #status>
            なし
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
