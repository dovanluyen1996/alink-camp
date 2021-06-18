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
            :modifier="['longdivider', { 'chevron' : hasChevron }]"
            @click="clickCourse(course)"
          >
            <div class="center">
              <span class="list-item__title">{{ course.name }}</span>
              <span class="list-item__subtitle">{{ course.address }}</span>
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-card>
  </div>
</template>

<script>
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
  },
  data() {
    return {
      isFullscreen: false,
    };
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
    clickCourse(course) {
      this.$emit('click', course);
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
