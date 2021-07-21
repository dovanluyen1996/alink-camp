<template>
  <v-ons-toolbar class="custom-toolbar">
    <div class="left">
      <slot name="left">
        <v-ons-back-button v-if="!disabledBackButton" />
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
  name: 'CustomToolbar',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    disabledBackButton: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ .back-button__icon {
  justify-content: center;
  width: 40px;
  text-align: center;

  svg {
    width: 10px;
  }
}

.toolbar {
  &--green {
    background: #80b700;
  }
}

.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  line-height: inherit;
  white-space: normal;
}

.custom-toolbar-title {
  font-size: 16px;
  font-weight: 600;
}

.custom-toolbar-subtitle {
  font-size: 12px;
}
</style>
