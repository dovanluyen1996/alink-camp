<template>
  <information-tab-item>
    <template #title>
      特徴
    </template>

    <template #content>
      <div class="content-body">
        筑波山の中腹にあるキャンプ場。山の斜面にテントサイトやBBQサイトがあり、登山のベースキャンプとしても気軽に利用できる。
        広大な施設内では数多くの植物が見られ、自然を思いっきり満喫できる。
      </div>
    </template>
  </information-tab-item>
</template>

<script>
// components
import InformationTabItem from '@/components/atoms/information-tab/item';

export default {
  name: 'CampsitesInformationFeatureTab',
  components: {
    InformationTabItem,
  },
};
</script>

<style scoped lang="scss">
  .content-body {
    margin-top: 15px;
  }
</style>
