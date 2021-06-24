<template>
  <div class="course-list">
    <div
      v-if="title"
      class="course-list-title"
    >
      {{ title }}
    </div>

    <v-ons-card :fullscreen="isFullscreen">
      <div class="content">
        <v-ons-list modifier="noborder">
          <v-ons-list-item
            v-for="course in courses"
            :key="course.id"
            :modifier="modifier"
            @click="clickCourse(course)"
          >
            <div class="center">
              <div class="list-item__title">
                {{ course.name }}
                <span
                  v-if="currentLocation"
                  class="course-distance"
                >
                  {{ getDistance(course.latitude, course.longitude) }}
                </span>
              </div>
              <span class="list-item__subtitle">{{ course.address }}</span>
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-card>
  </div>
</template>

<script>
import LatLon from 'geodesy/latlon-ellipsoidal-vincenty.js';

export default {
  name: 'CourseList',
  props: {
    title: {
      type: String,
      default: null,
    },
    courses: {
      type: Array,
      default: () => [],
    },
    hasChevron: {
      type: Boolean,
      default: true,
    },
    currentLocation: {
      type: Object,
      default: () => null,
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
    goToSummary() {
      this.$store.dispatch('scoresNavigator/push', Summary);
    },
    getDistance(latitude, longitude) {
      // eslint-disable-next-line max-len
      const currentPoint = new LatLon(this.currentLocation.longitude, this.currentLocation.latitude);
      const coursePoint = new LatLon(longitude, latitude);
      let distance = currentPoint.distanceTo(coursePoint);

      if (distance >= 1000) {
        const convertKm = distance / 1000;
        const converFirstDecimal = Math.round(convertKm * 10) / 10;
        distance = `${converFirstDecimal} km`;
      } else {
        distance = `${Math.round(distance)} m`;
      }

      return distance;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
@import '@/assets/scss/_mixins.scss';

.course-list {
  &[fullscreen] {
    height: 100%;
    overflow: hidden;
  }
}

.card {
  padding-top: 5px;
  padding-bottom: 0;
}

.course-list-title {
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

.course-distance {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  height: 18px;
  padding: 0 12px;
  margin-left: 8px;
  font-size: $font-size-small;
  background: #f2f2f2;
  border-radius: 9px;
}
</style>
