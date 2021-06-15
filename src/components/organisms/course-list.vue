<template>
  <card-with-title>
    <template #title>
      {{ title }}
    </template>

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
  </card-with-title>
</template>

<script>
import CardWithTitle from '@/components/organisms/card-with-title';

export default {
  name: 'CourseList',
  components: {
    CardWithTitle,
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
  methods: {
    clickCourse(course) {
      this.$emit('click', course);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

/deep/ {
  .card {
    padding-top: 5px;
    padding-bottom: 0;
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
