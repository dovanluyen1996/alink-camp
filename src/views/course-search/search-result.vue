<template>
  <v-ons-page :infinite-scroll="search">
    <custom-toolbar :title="title" />
    <div class="content">
      <no-data v-if="courses.length === 0">
        条件に合うコースが見つかりません
      </no-data>

      <course-list
        v-else
        :courses="courses"
        :current-location="currentLocation"
        @click="goToCourseShow"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import NoData from '@/components/organisms/no-data';
import CourseList from '@/components/organisms/course-list';

// pages
import CourseShow from '@/views/courses/show';

export default {
  name: 'CourseSearchResult',
  components: {
    NoData,
    CourseList,
  },
  props: {
    title: {
      type: String,
      default: '検索結果',
    },
    currentLocation: {
      type: Object,
      default: () => null,
    },
    searchConditions: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      page: 2,
    };
  },
  computed: {
    courses() {
      return this.$store.getters['models/course/all'];
    },
    totalCount() {
      return this.$store.getters['models/course/totalCount'];
    },
  },
  methods: {
    goToCourseShow(course) {
      this.$store.dispatch('courseSearchNavigator/push', {
        extends: CourseShow,
        onsNavigatorProps: {
          course,
        },
      });
    },
    searchType() {
      return this.searchConditions.type || 'name';
    },
    async search(done) {
      // if getted courses is the same with total count, finish paging
      if (this.totalCount === this.$store.getters['models/course/size']) {
        if (done) done();
        return;
      }

      await this.$store.dispatch('models/course/getCourses', this.searchParams())
        .then(() => {
          this.page += 1;
        })
        .then(() => {
          if (done) done();
        });
    },
    searchByNameParams() {
      return {
        name: this.searchConditions.name,
        page: this.page,
      };
    },
    searchByAreaParams() {
      return {
        prefecture_id: this.searchConditions.prefecture,
        target_date: this.searchConditions.targetDate,
        temperature: this.searchConditions.temperature,
        sunny: this.searchConditions.sunny,
        wind: this.searchConditions.wind,
        uv: this.searchConditions.uv,
        page: this.page,
      };
    },
    searchByLocationParams() {
      // TODO: after search by location is merged, implement paging for search location
    },
    searchByPrefectureParams() {
      return {
        prefecture_id: this.searchConditions.prefecture,
        page: this.page,
      };
    },
    searchParams() {
      switch (this.searchType()) {
      case 'area':
        return this.searchByAreaParams();
      case 'prefecture':
        return this.searchByPrefectureParams();
      case 'location':
        return this.searchByLocationParams();
      default:
        return this.searchByNameParams();
      }
    },
  },
};
</script>
