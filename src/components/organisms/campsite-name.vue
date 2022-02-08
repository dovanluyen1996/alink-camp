<template>
  <div class="campsite-name">
    <span class="campsite-name__inner">
      {{ campsiteName }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'CampsiteName',
  props: {
    campsiteName: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
.campsite-name {
  padding: 7px 30px;
  margin-bottom: 30px;
  font-size: 18px;
  word-break: break-all;
  background: #fff;

  &__inner {
    display: inline-block;
    text-align: left;
  }
}
</style>
