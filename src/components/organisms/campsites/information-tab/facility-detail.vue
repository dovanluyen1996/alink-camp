<template>
  <information-tab-item>
    <template #title>
      施設詳細
      <img src="@/assets/images/information-item.png">
    </template>

    <template #content>
      <content-item>
        <template #sub-title>
          場内施設
        </template>

        <template #sub-content>
          炊事棟、水洗トイレ、温水シャワーほか
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          管理体制
        </template>

        <template #sub-content>
          管理人10:00-15:00定時常駐（宿泊利用者がいる場合のみ）/チェックイン <br>
          10:00-15:00/アウト10:00/デイキャンプはアウト17:00/
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          レンタル詳細
        </template>

        <template #sub-content>
          毛布、布団、調理器具
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          売店販売品目
        </template>

        <template #sub-content>
          薪
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          オートキャンプ
        </template>

        <template #sub-content>
          不可
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          デイキャンプ
        </template>

        <template #sub-content>
          常時可
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          宿泊施設
        </template>

        <template #sub-content>
          トレーラーハウス &nbsp;&nbsp; × <br>
          バンガロー等 &nbsp;&nbsp; × <br>
          常設テント等 &nbsp;&nbsp; ×
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          場内施設
        </template>

        <template #sub-content>
          AC電源付きサイト &nbsp;&nbsp; × <br>
          ランドリー &nbsp;&nbsp; ○ <br>
          温水シャワー &nbsp;&nbsp; ○ <br>
          風呂 &nbsp;&nbsp; × <br>
          温泉 &nbsp;&nbsp; × <br>
          バリアフリー施設 &nbsp;&nbsp; ×
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          禁止事項
        </template>

        <template #sub-content>
          直火 全面禁止 <br>
          ペット 全面禁止 <br>
          花火 全面禁止
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
  name: 'CampsitesInfomationFacilityDetail',
  components: {
    InformationTabItem,
    ContentItem,
  },
};
</script>
