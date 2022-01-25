<template>
  <div class="spot-list">
    <v-ons-card :fullscreen="isFullscreen">
      <div class="content">
        <v-ons-list>
          <v-ons-list-item
            v-for="spot in spots"
            :key="spot.id"
          >
            <div
              class="center"
              @click="openMap(spot)"
            >
              <div class="list-item__title">
                <span>
                  {{ spot.name }} ({{ Math.round(spot.distance) }}km)
                </span>
              </div>
              <span class="list-item__subtitle">{{ spot.address }}</span>
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-card>
  </div>
</template>

<script>

export default {
  name: 'SpotList',
  props: {
    spots: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isFullscreen: false,
    };
  },
  computed: {
    openMap() {
      return spot => this.$helpers.openPageByUrl(`https://maps.google.com/?q=${encodeURI(spot.name)}`);
    },
  },
  mounted() {
    this.setFullscreen();
  },
  methods: {
    setFullscreen() {
      // NOTE: propsにしたいところだけれど、
      //       onsenUIが全画面表示をfullscreen属性でやっているので
      //       合わせたほうがわかりやすいためDOMから探している
      const isFullscreen = this.$el.getAttribute('fullscreen');
      if (isFullscreen !== null) {
        this.isFullscreen = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
@import '@/assets/scss/_mixins.scss';

.spot-list {
  &[fullscreen] {
    height: 100%;
    overflow: hidden;
  }
}

.card {
  padding-top: 5px;
  padding-bottom: 0;
}

.center {
  padding-top: 20px;
  padding-bottom: 20px;
}

.list-item {
  &__title {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 18px;
    line-height: 1.2;
  }

  &__subtitle {
    font-size: $font-size-small;
    color: $color-subtext;
  }
}
</style>
