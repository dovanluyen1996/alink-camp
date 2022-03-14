<template>
  <information-tab-item>
    <template #title>
      施設詳細
    </template>

    <template #content>
      <content-item>
        <template #sub-title>
          場内施設
        </template>

        <template #sub-content>
          {{ campsite.facilities }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          管理体制
        </template>

        <template #sub-content>
          {{ campsite.management }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          レンタル詳細
        </template>

        <template #sub-content>
          {{ campsite.rental }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          売店販売品目
        </template>

        <template #sub-content>
          {{ campsite.shopLineup }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          オートキャンプ
        </template>

        <template #sub-content>
          {{ campsite.styleAutoCamping ? '可' : '不可' }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          デイキャンプ
        </template>

        <template #sub-content>
          {{ dayCamping }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          宿泊施設
        </template>

        <template #sub-content>
          <content-status-item>
            <template #text>
              トレーラーハウス
            </template>
            <template #status>
              {{ campsite.facilityTrailerHouse === 1 ? 'あり' : 'なし' }}
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              バンガロー等
            </template>
            <template #status>
              {{ campsite.facilityBungalow === 1 ? 'あり' : 'なし' }}
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              常設テント等
            </template>
            <template #status>
              {{ campsite.facilityPermanentTent === 1 ? 'あり' : 'なし' }}
            </template>
          </content-status-item>
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          場内施設
        </template>

        <template #sub-content>
          <content-status-item>
            <template #text>
              AC電源付きサイト
            </template>
            <template #status>
              {{ campsite.facilityAc === 1 ? 'あり' : 'なし' }}
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              ランドリー
            </template>
            <template #status>
              {{ campsite.facilityLaundry === 1 ? 'あり' : 'なし' }}
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              水洗トイレ
            </template>
            <template #status>
              {{ campsite.facilityFlushToilet === 1 ? 'あり' : 'なし' }}
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              温水シャワー
            </template>
            <template #status>
              {{ campsite.facilityShower === 1 ? 'あり' : 'なし' }}
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              風呂
            </template>
            <template #status>
              {{ campsite.facilityBathroom === 1 ? 'あり' : 'なし' }}
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              温泉
            </template>
            <template #status>
              {{ campsite.facilityHotSpring === 1 ? 'あり' : 'なし' }}
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              バリアフリー施設
            </template>
            <template #status>
              {{ campsite.facilityBarrierFree === 1 ? 'あり' : 'なし' }}
            </template>
          </content-status-item>
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          禁止事項
        </template>

        <template #sub-content>
          <content-status-item>
            <template #text>
              直火
            </template>
            <template #status>
              {{ directHeat }}
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              ペット
            </template>
            <template #status>
              {{ pets }}
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              花火
            </template>
            <template #status>
              {{ firework }}
            </template>
          </content-status-item>
        </template>
      </content-item>
    </template>
  </information-tab-item>
</template>

<script>
// components
import InformationTabItem from '@/components/atoms/information-tab/item';
import ContentItem from '@/components/atoms/information-tab/content-item';
import ContentStatusItem from '@/components/atoms/information-tab/content-status-item';

export default {
  name: 'CampsitesInformationFacilityDetail',
  computed: {
    campsite() {
      return this.$store.getters['campsite/choosenCampsite'];
    },
    dayCamping() {
      let label = '';

      switch (this.campsite.styleDayCamping) {
      case 0:
        label = '不可';
        break;
      case 1:
        label = '常時可';
        break;
      case 2:
        label = '期間により可';
        break;
      default:
        label = '';
      }

      return label;
    },
    directHeat() {
      let label = '';

      switch (this.campsite.ruleDirectHeat) {
      case 0:
        label = '禁止事項なし';
        break;
      case 1:
        label = '全面禁止';
        break;
      case 2:
        label = '一部禁止・条件付き可';
        break;
      default:
        label = '';
      }

      return label;
    },
    pets() {
      let label = '';

      switch (this.campsite.rulePets) {
      case 0:
        label = '禁止事項なし';
        break;
      case 1:
        label = '全面禁止';
        break;
      case 2:
        label = '一部禁止・条件付き可';
        break;
      default:
        label = '';
      }

      return label;
    },
    firework() {
      let label = '';

      switch (this.campsite.ruleFirework) {
      case 0:
        label = '禁止事項なし';
        break;
      case 1:
        label = '全面禁止';
        break;
      case 2:
        label = '一部禁止・条件付き可';
        break;
      default:
        label = '';
      }

      return label;
    },
  },
  components: {
    InformationTabItem,
    ContentItem,
    ContentStatusItem,
  },
};
</script>
