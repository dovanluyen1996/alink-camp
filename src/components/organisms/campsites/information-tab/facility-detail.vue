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
          <content-status-item>
            <template #text>
              トレーラーハウス
            </template>
            <template #status>
              あり
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              バンガロー等
            </template>
            <template #status>
              あり
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              常設テント等
            </template>
            <template #status>
              なし
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
              不可
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              ランドリー
            </template>
            <template #status>
              不可
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              水洗トイレ
            </template>
            <template #status>
              不可
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              温水シャワー
            </template>
            <template #status>
              不可
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              風呂
            </template>
            <template #status>
              不可
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              温泉
            </template>
            <template #status>
              不可
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              バリアフリー施設
            </template>
            <template #status>
              不可
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
              一部禁止・条件付き可
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              ペット
            </template>
            <template #status>
              一部禁止・条件付き可
            </template>
          </content-status-item>

          <content-status-item>
            <template #text>
              花火
            </template>
            <template #status>
              一部禁止・条件付き可
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
  components: {
    InformationTabItem,
    ContentItem,
    ContentStatusItem,
  },
};
</script>
