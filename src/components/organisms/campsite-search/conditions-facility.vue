<template>
  <div>
    <div class="card__title">
      キャンプロケーション
    </div>
    <div class="location-grid">
      <div
        v-for="item in locations"
        :key=item.value
        class="location-grid--item"
      >
        <check-field />
        <label>{{ item.text }}</label>
      </div>
    </div>

    <div class="card__title">
      施設情報
    </div>
    <div class="facility">
      <div
        v-for="item in facilitys"
        :key=item.value
        class="facility-flex"
      >
        <label>{{ item.text }}</label>
        <check-field />
      </div>
    </div>

    <div class="card__title">
      周辺情報
    </div>
    <div class="nearby-information">
      <div
        v-for="item in nearby"
        :key=item.value
        class="nearby-flex"
      >
        <label>{{ item.text }}</label>
        <check-field />
      </div>
    </div>
  </div>
</template>

<script>
import CheckField from '@/components/organisms/form/check-field';

export default {
  name: 'CampsiteSearchConditionsFacility',
  components: {
    CheckField,
  },
  data() {
    return {
      locations: [
        {
          value: 1,
          text: '河畔',
        },
        {
          value: 2,
          text: '臨海',
        },
        {
          value: 3,
          text: '高原',
        },
        {
          value: 4,
          text: '湖畔',
        },
        {
          value: 5,
          text: '林間',
        },
        {
          value: 6,
          text: '公園',
        },
        {
          value: 7,
          text: '海岸',
        },
        {
          value: 8,
          text: '山間',
        },
        {
          value: 9,
          text: 'その他',
        },
      ],
      facilitys: [
        {
          value: 1,
          text: 'カードの利用可',
        },
        {
          value: 2,
          text: '駐車場有',
        },
        {
          value: 3,
          text: '駅から徒歩5分以内',
        },
        {
          value: 4,
          text: 'オートキャンプ可能',
        },
        {
          value: 5,
          text: 'デイキャンプ可能',
        },
        {
          value: 6,
          text: 'トレーラーハウス有',
        },
        {
          value: 7,
          text: 'バンガローなどの宿泊施設有',
        },
        {
          value: 8,
          text: '常設テント・ティピー・パオの有',
        },
        {
          value: 9,
          text: 'AC電源付きサイトの有',
        },
        {
          value: 10,
          text: 'ランドリーの有',
        },
        {
          value: 11,
          text: '水洗トイレの有',
        },
        {
          value: 12,
          text: '温水シャワーの有',
        },
        {
          value: 13,
          text: 'お風呂有',
        },
        {
          value: 14,
          text: '温泉有',
        },
        {
          value: 15,
          text: 'バリアフリー施設有',
        },
        {
          value: 16,
          text: '直火が可',
        },
        {
          value: 17,
          text: 'ペット連れが可',
        },
        {
          value: 18,
          text: '花火が可',
        },
      ],
      nearby: [
        {
          value: 1,
          text: '周辺でのカヌー可',
        },
        {
          value: 2,
          text: '周辺での釣り可',
        },
        {
          value: 3,
          text: '周辺でのトレッキング可',
        },
        {
          value: 4,
          text: '周辺でのスターウォッチング可',
        },
        {
          value: 5,
          text: '周辺でのスターウォッチング可',
        },
        {
          value: 6,
          text: '周辺での海水浴可',
        },
        {
          value: 7,
          text: '周辺での海水浴可',
        },
        {
          value: 8,
          text: '周辺の温泉施設',
        },
        {
          value: 9,
          text: '周辺の観光牧場',
        },
        {
          value: 10,
          text: '周辺のレジャー施設',
        },
      ],
    };
  },
};
</script>

<style scoped lang="scss">

.card__title {
  padding-bottom: 15px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: 600;
  color: #000;
  border-bottom: 1px solid #d9d9d9;
}

.location-grid,
.facility,
.nearby-information {
  font-size: 16px;
  font-weight: 600;
}

.location-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  &--item {
    display: flex;
    align-items: center;
  }

  .check-field {
    margin-right: 10px;
  }
}

.facility-flex,
.nearby-flex {
  display: flex;
  justify-content: space-between;
}
</style>
