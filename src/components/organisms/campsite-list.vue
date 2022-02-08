<template>
  <div class="campsite-list">
    <div
      v-if="title"
      class="campsite-list-title"
    >
      {{ title }}
    </div>

    <v-ons-card :fullscreen="isFullscreen">
      <div class="content">
        <v-ons-list modifier="noborder">
          <v-ons-list-item
            v-for="campsite in campsites"
            :key="campsite.id"
            :modifier="modifier"
            @click="clickCampsite(campsite)"
          >
            <div class="center">
              <div class="list-item__title">
                <span>
                  {{ campsite.name }}
                  <img
                    v-if="isShowFavoriteMark && isFavorited(campsite)"
                    src="@/assets/images/user/user-plan/favorite.png"
                    width="18px"
                  >
                </span>
              </div>
              <span class="list-item__subtitle">{{ campsite.address }}</span>
            </div>
            <div class="right">
              <slot name="right" />
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-card>
  </div>
</template>

<script>

export default {
  name: 'CampsiteList',
  props: {
    title: {
      type: String,
      default: null,
    },
    campsites: {
      type: Array,
      default: () => [],
    },
    hasChevron: {
      type: Boolean,
      default: true,
    },
    isShowFavoriteMark: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFullscreen: false,
    };
  },
  computed: {
    modifier() {
      return `longdivider ${this.hasChevron ? 'chevron' : ''}`;
    },
    isFavorited() {
      return campsite => this.$store.getters['models/usersFavorite/findByCampsiteId'](campsite.id);
    },
  },
  mounted() {
    this.setFullscreen();
  },
  methods: {
    isFavorite(campsite) {
      return this.$store.getters['models/usersFavorite/findByCampsiteId'](campsite.id);
    },
    setFullscreen() {
      // NOTE: propsにしたいところだけれど、
      //       onsenUIが全画面表示をfullscreen属性でやっているので
      //       合わせたほうがわかりやすいためDOMから探している
      const isFullscreen = this.$el.getAttribute('fullscreen');
      if (isFullscreen !== null) {
        this.isFullscreen = true;
      }
    },
    clickCampsite(campsite) {
      // NOTE: Please implement add viewed campsite when implement Logic
      // this.addViewedCourse(course);
      this.$emit('click', campsite);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
@import '@/assets/scss/_mixins.scss';

.campsite-list {
  &[fullscreen] {
    height: 100%;
    overflow: hidden;
  }
}

.card {
  padding-top: 5px;
  padding-bottom: 0;
}

.campsite-list-title {
  @include title-style;

  margin-top: 25px;

  + .card {
    margin-top: 14px;
  }
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
