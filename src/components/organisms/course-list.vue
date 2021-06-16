<template>
  <div class="course-list">
    <div
      v-if="title"
      class="course-list-title"
    >
      {{ title }}
    </div>

    <no-data v-if="courses.length === 0">
      条件に合うコースが見つかりません
    </no-data>

    <v-ons-card
      v-else
      :fullscreen="isFullscreen"
    >
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
// components
import NoData from '@/components/organisms/no-data';

export default {
  name: 'CourseList',
  components: {
    NoData,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    hasChevron: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isFullscreen: false,
      courses: [
        {
          id: 1,
          poi_id: 1,
          jalan_code: 'shintoukyou',
          name: '新東京都民ゴルフ場',
          name_kana: 'シントウキョウトミンゴルフジョウ',
          address: '東京都足立区新田１丁目１５−１',
          latitude: 0,
          longitude: 0,
          phone: '000-0000-0000',
          phone2: '000-0000-0000',
          url: 'http://',
          jalan_description: 'じゃらんコース紹介',
          jalan_image_path: 'jaran_image_path',
          jalan_url: 'jaran_url',
          note: '備考',
        },
        {
          id: 2,
          poi_id: 2,
          jalan_code: 'shintoukyou',
          name: '新東京都民ゴルフ場',
          name_kana: 'シントウキョウトミンゴルフジョウ',
          address: '東京都足立区新田１丁目１５−１',
          latitude: 0,
          longitude: 0,
          phone: '000-0000-0000',
          phone2: '000-0000-0000',
          url: 'http://',
          jalan_description: 'じゃらんコース紹介',
          jalan_image_path: 'jaran_image_path',
          jalan_url: 'jaran_url',
          note: '備考',
        },
      ],
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
