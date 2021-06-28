<template>
  <div class="courses-information-tab">
    <table class="courses-information">
      <tr>
        <th
          class="th"
          scope="row"
        >
          住所
        </th>
        <td>
          {{ course.address }}
          <!-- NOTE: テキストリンクは当たり判定が小さすぎるので広げる処置 -->
          <span class="map-link">
            MAP
            <a
              :href="mapUrl"
              class="map-link__target"
              :target="target()"
            >
            </a></span>
        </td>
      </tr>
      <tr>
        <th
          class="th"
          scope="row"
        >
          電話番号&#9312;
        </th>
        <td>
          {{ course.phone }}
        </td>
      </tr>
      <tr>
        <th
          class="th"
          scope="row"
        >
          電話番号&#9313;
        </th>
        <td>
          {{ course.phone2 }}
        </td>
      </tr>
      <tr>
        <th
          class="th"
          scope="row"
        >
          ホームページ
        </th>
        <td>
          {{ course.url }}
        </td>
      </tr>
      <tr>
        <th
          class="th"
          scope="row"
        >
          予約
        </th>
        <td>
          {{ course.jalanUrl }}
        </td>
      </tr>
      <tr>
        <th
          class="th"
          scope="row"
        >
          コース紹介
        </th>
        <td>
          {{ course.jalanDescription }}
        </td>
      </tr>
      <tr>
        <th
          class="th"
          scope="row"
        >
          備考
        </th>
        <td>
          {{ course.note }}
        </td>
      </tr>
    </table>

    <div class="course-image">
      <img :src="course.jalanImagePath">
    </div>
  </div>
</template>

<script>
import ApiClient from '@/api_client';

export default {
  name: 'CoursesInformationTab',
  props: {
    options: {
      type: Object,
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      course: {},
    };
  },
  computed: {
    mapUrl() {
      return `https://maps.google.com/?q=${this.course.latitude},${this.course.longitude}`;
    },
  },
  async created() {
    await this.getCourseInfor();
  },
  methods: {
    async getCourseInfor() {
      if (!this.options.courseId) return;

      this.course = await ApiClient.getCourse(this.options.courseId);
    },
    target() {
      return (cordova.platformId === 'browser') ? '_self' : '_blank';
    },
  },
};
</script>

<style lang="scss" scoped>
.courses-information {
  word-break: break-all;
}

.th {
  text-align: left;
  white-space: nowrap;
}

.map-link {
  position: relative;
  margin-left: 10px;
  color: #0061ca;

  &__target {
    position: absolute;
    top: -10px;
    right: -10px;
    bottom: -10px;
    left: -10px;
    text-decoration: none;
  }
}

.course-image {
  margin-top: 15px;
  text-align: center;

  img {
    max-width: 100%;
  }
}
</style>
