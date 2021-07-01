<template>
  <v-ons-page>
    <custom-toolbar :title="title" />
    <course-name :course-name="userCourseResult.name" />
    <weather-and-image v-model="image" />
    <target-date-field
      v-model="target_date"
      title="プレイ日（必須）"
    />
    <scores-field
      :total-score.sync="total_score"
      :patting-score.sync="patting_score"
    />
    <note-field v-model="note" />
    <fixed-footer>
      <v-ons-button
        modifier="large--cta add rounded"
        @click="submitScore"
      >
        保存
      </v-ons-button>
    </fixed-footer>
  </v-ons-page>
</template>

<script>
// components
import CourseName from '@/components/organisms/course-name';
import TargetDateField from '@/components/organisms/scores/result/target-date-field';
import ScoresField from '@/components/organisms/scores/result/scores-field';
import WeatherAndImage from '@/components/organisms/scores/result/weather-and-image';
import NoteField from '@/components/organisms/scores/result/note-field';
import FixedFooter from '@/components/organisms/fixed-footer';

export default {
  name: 'ScoresResultNew',
  components: {
    CourseName,
    TargetDateField,
    ScoresField,
    WeatherAndImage,
    NoteField,
    FixedFooter,
  },
  props: {
    userCourseResult: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      target_date: '',
      total_score: '',
      patting_score: '',
      image: require('@/assets/images/course-sample.jpg'),
      note: '',
    };
  },
  computed: {
    title() {
      // TODO: フォーマットしてください
      return this.userCourseResult.targetDate;
    },
  },
  methods: {
    submitScore() {
      // TODO: スコアを保存
    },
  },
};
</script>
