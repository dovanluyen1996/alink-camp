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
          <component
            :is="tab.component"
            v-show="isActive(index)"
            :key="index"
          />
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
  },
  data() {
    return {
      activeIndex: 0,
    };
  },
  methods: {
    switchTab(index) {
      this.activeIndex = index;
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

.card-tab-button {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  margin: 0 4px;
  color: #fff;
  background: #0061ca;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  &.active {
    color: inherit;
    background: #fff;
  }
}
</style>
