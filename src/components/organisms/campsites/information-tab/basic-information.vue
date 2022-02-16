<template>
  <information-tab-item>
    <template #title>
      基本情報
    </template>

    <template #content>
      <content-item>
        <template #sub-title>
          住所
        </template>

        <template #sub-content>
          {{ campsite.address }}
          <span class="map-link">
            MAP
            <a
              class="map-link__target"
              @click="openPage(mapUrl)"
            >
            </a>
          </span>
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          ホームページ
        </template>

        <template #sub-content>
          <a
            class="website-link"
            @click="openPage(campsite.url)"
          >
            {{ campsite.url }}
          </a>
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          予約電話番号
        </template>

        <template #sub-content>
          <a
            class="phone-link"
            :href="`tel:${campsite.phone}`"
          >
            {{ campsite.phone }}
          </a>
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          予約受付状況
        </template>

        <template #sub-content>
          {{ campsite.reservable }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          営業期間
        </template>

        <template #sub-content>
          {{ campsite.businessPeriod }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          営業時間
        </template>

        <template #sub-content>
          {{ campsite.businessHours }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          休業日
        </template>

        <template #sub-content>
          {{ campsite.holiday }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          料金
        </template>

        <template #sub-content>
          {{ campsite.fee }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          カード利用
        </template>

        <template #sub-content>
          {{ creditCard }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          駐車場
        </template>

        <template #sub-content>
          {{ parking }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          駐車料金
        </template>

        <template #sub-content>
          {{ parkingFee }}
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          サイト詳細
        </template>

        <template #sub-content>
          {{ campsite.details }}
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
  name: 'CampsitesBasicInformation',
  computed: {
    campsite() {
      return this.$store.getters['campsite/choosenCampsite'];
    },
    creditCard() {
      let label = '';

      switch (this.campsite.creditCard) {
      case 0:
        label = '不可';
        break;
      case 1:
        label = '可';
        break;
      case 2:
        label = '情報なし';
        break;
      case 3:
        label = '対象外';
        break;
      default:
        label = '';
      }

      return label;
    },
    parking() {
      let label = '';

      switch (this.campsite.parking) {
      case 0:
        label = '不可';
        break;
      case 1:
        label = '可';
        break;
      case 2:
        label = '情報なし';
        break;
      case 3:
        label = '対象外';
        break;
      default:
        label = '';
      }

      return label;
    },
    parkingFee() {
      let label = '';

      switch (this.campsite.parkingFee) {
      case 0:
        label = '無料';
        break;
      case 1:
        label = '有料';
        break;
      case 2:
        label = '情報なし';
        break;
      case 3:
        label = '対象外';
        break;
      default:
        label = '';
      }

      return label;
    },
    mapUrl() {
      return `https://maps.google.com/?q=${encodeURI(this.campsite.name)}`;
    },
  },
  methods: {
    openPage(url) {
      this.$helpers.openPageByUrl(url);
    },
  },
  components: {
    InformationTabItem,
    ContentItem,
  },
};
</script>

<style scoped lang="scss">
// TODO：ロジック実装時に不要であれば削除する
.map-link {
  position: relative;
  color: #9883de;

  &__target {
    position: absolute;
    top: -10px;
    right: -10px;
    bottom: -10px;
    left: -10px;
    text-decoration: none;
  }
}

// TODO：ロジック実装時に不要であれば削除する
.website-link,
.phone-link {
  color: #9883de;
}
</style>
