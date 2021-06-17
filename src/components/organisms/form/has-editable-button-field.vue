<template>
  <base-field
    :title="title"
    class="has-editable-button-field"
  >
    {{ value }}
    <!-- NOTE: 見た目が小さいボタンのため当たり判定を広げている -->
    <div
      class="button-edit"
      @click="clickEdit"
    >
      <v-ons-button>
        変更
      </v-ons-button>
    </div>
  </base-field>
</template>

<script>
import BaseField from './base-field';

export default {
  name: 'HasEditableBUttonField',
  components: {
    BaseField,
  },
  props: {
    value: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
  },
  methods: {
    clickEdit() {
      this.$emit('clickEdit');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/scss/_variables.scss';

.has-editable-button-field /deep/ .card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 13px;
  padding-bottom: 13px;
  font-size: $font-size-large;
  font-weight: 600;
}

.button-edit {
  padding: 10px 0;

  .button {
    width: 80px;
    height: auto;
    font-size: $font-size-small;
    line-height: 16px;
    text-align: center;
  }
}
</style>
