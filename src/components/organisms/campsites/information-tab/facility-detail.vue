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
          トレーラーハウス &nbsp;&nbsp; {{ campsite.facilityTrailerHouse === 1 ? 'あり' : 'なし' }} <br>
          バンガロー等 &nbsp;&nbsp; {{ campsite.facilityBungalow === 1 ? 'あり' : 'なし' }} <br>
          常設テント等 &nbsp;&nbsp; {{ campsite.facilityPermanentTent === 1 ? 'あり' : 'なし' }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          場内施設
        </template>

        <template #sub-content>
          AC電源付きサイト &nbsp;&nbsp; {{ campsite.facilityAc === 1 ? 'あり' : 'なし' }} <br>
          ランドリー &nbsp;&nbsp; {{ campsite.facilityLaundry === 1 ? 'あり' : 'なし' }} <br>
          水洗トイレ &nbsp;&nbsp; {{ campsite.facilityFlushToilet === 1 ? 'あり' : 'なし' }} <br>
          温水シャワー &nbsp;&nbsp; {{ campsite.facilityShower === 1 ? 'あり' : 'なし' }} <br>
          風呂 &nbsp;&nbsp; {{ campsite.facilityBathroom === 1 ? 'あり' : 'なし' }} <br>
          温泉 &nbsp;&nbsp; {{ campsite.facilityHotSpring === 1 ? 'あり' : 'なし' }} <br>
          バリアフリー施設 &nbsp;&nbsp; {{ campsite.facilityBarrierFree === 1 ? 'あり' : 'なし' }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          禁止事項
        </template>

        <template #sub-content>
          直火 {{ directHeat }} <br>
          ペット {{ pets }} <br>
          花火 {{ firework }}
        </template>
      </content-item>
    </template>
  </information-tab-item>
</template>

<script>
// components
import InformationTabItem from '@/components/atoms/information-tab/item';
import ContentItem from '@/components/atoms/information-tab/content-item';

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
  },
};
</script>
