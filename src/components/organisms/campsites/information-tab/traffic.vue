<template>
  <information-tab-item>
    <template #title>
      交通アクセス
      <img src="@/assets/images/information-item.png">
    </template>

    <template #content>
      <div class="content-body">
        車：東北自動車道・矢板ＩＣより車で15分。東北自動車道・宇都宮ＩＣより車で40分。国道4号氏家より国道293号へ車で10分 <br>
        電車：ＪＲ氏家駅よりタクシー３０分

        <div class="traffic-map">
          <!-- TODO: Implement google map when implement logic -->
          <img
            class="image-temp"
            src="@/assets/images/google-map.png"
          >

          <div class="traffic-button">
            <v-ons-button modifier="cta rounded custom-button">
              GoogleMapで見る
            </v-ons-button>
          </div>
        </div>
      </div>
    </template>
  </information-tab-item>
</template>

<script>
// components
import InformationTabItem from '@/components/atoms/information-tab/item';

export default {
  name: 'CampsitesInfomationTraffic',
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
    font-size: 8px;
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
