<template>
  <v-ons-toolbar class="custom-toolbar">
    <div class="left">
      <slot name="left">
        <v-ons-back-button />
      </slot>
    </div>
    <div class="center">
      <slot>
        <div class="custom-toolbar-title">
          {{ title }}
        </div>
        <div class="custom-toolbar-subtitle">
          {{ subtitle }}
        </div>
      </slot>
    </div>
    <div class="right">
      <slot name="right" />
    </div>
  </v-ons-toolbar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .back-button__icon {
  width: 40px;
  text-align: center;
  justify-content: center;
  svg {
    width: 10px;
  }
}
.center {
  line-height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.custom-toolbar-title {
  font-size: 16px;
  font-weight: 600;
}
.custom-toolbar-subtitle {
  font-size: 12px;
}
</style>
