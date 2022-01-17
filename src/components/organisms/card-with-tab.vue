<template>
  <div class="card-width-tab">
    <div class="card-tab">
      <div
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['card-tab-button', {'active' : isActive(index)}]"
        @click="switchTab(index)"
      >
        {{ tab.label }}
      </div>
    </div>

    <v-ons-card class="card-tab__content">
      <div class="content">
        <template v-for="(tab, index) in tabs">
          <transition
            :key="index"
            name="fade"
          >
            <component
              :is="tab.component"
              v-show="isActive(index)"
            />
          </transition>
        </template>
      </div>
    </v-ons-card>
  </div>
</template>

<script>
export default {
  name: 'CardWithTab',
  props: {
    tabs: {
      type: Array,
      default: () => [],
    },
    activeIndex: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    switchTab(index) {
      this.$emit('switchTab', index);
    },
    isActive(index) {
      return index === this.activeIndex;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_mixins.scss';

.card-tab {
  display: flex;
  margin: 20px 30px 0;

  &__content {
    margin-top: 0;
  }
}

.custom-card {
  .card-tab {
    margin: 20px 10px 0;
  }
}

.card__content {
  position: relative;
}

.campsite-show {
  .card {
    padding: 0;
    margin: 0;
    background: none;
    border-radius: 0;
  }
}

.card-tab-button {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  margin: 0 4px;
  color: #fff;
  background: #c83200;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  &.active {
    color: inherit;
    background: #fff;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  position: absolute;
  top: 0;
  width: 100%;
  opacity: 0;
}

/* NOTE: onsenUIの仕様に合わせて
 * propsではなくattributeでstyleをあてる
 */
.card-width-tab[fullscreen] {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  .card-tab__content {
    flex: 1;
    overflow: hidden;
  }

  .card__content {
    height: 100%;
    overflow: auto;
  }
}
</style>
