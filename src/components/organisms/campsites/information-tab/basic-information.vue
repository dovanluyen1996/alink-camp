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
          大田区下丸子～～～～～
          <span class="map-link">
            MAP
            <a
              class="map-link__target"
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
          <a class="website-link">
            http://～～～
          </a>
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          予約電話番号
        </template>

        <template #sub-content>
          <!-- TODO: Implement href="tel:" by campsite phone number when implement logic -->
          <a
            class="phone-link"
            href="tel:090-9999-9999"
          >
            090-9999-9999
          </a>
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          予約受付状況
        </template>

        <template #sub-content>
          予約受付中
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          営業期間
        </template>

        <template #sub-content>
          5〜9月
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          営業時間
        </template>

        <template #sub-content>
          イン10:00〜15:00 アウト10:00（デイキャンプアウト17:00）
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          休業日
        </template>

        <template #sub-content>
          期間中月〜木曜、祝日の場合は営業、7月15日〜8月31日は無休 <br>
          事前予約利用者がない場合は休業
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          料金
        </template>

        <template #sub-content>
          サイト利用料＝500円、小学生未満無料/
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          カード利用
        </template>

        <template #sub-content>
          対象外
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          駐車場
        </template>

        <template #sub-content>
          対象外
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          駐車料金
        </template>

        <template #sub-content>
          情報なし
        </template>
      </content-item>

      <content-item>
        <template #sub-title>
          サイト詳細
        </template>

        <template #sub-content>
          テント専用15張り、サイトは土
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
