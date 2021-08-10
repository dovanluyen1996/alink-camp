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
          <a :href="`tel:${course.phone}`">
            {{ course.phone }}
          </a>
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
          <a :href="`tel:${course.phone2}`">
            {{ course.phone2 }}
          </a>
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
          <a
            :href="course.url"
            :target="target()"
          >
            {{ course.url }}
          </a>
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
          <a
            :href="course.jalanUrl"
            :target="target()"
          >
            {{ course.jalanUrl }}
          </a>
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
export default {
  name: 'CoursesInformationTab',
  computed: {
    course() {
      return this.$store.getters['course/choosenCourse'];
    },
    mapUrl() {
      return `https://maps.google.com/?q=${this.course.latitude},${this.course.longitude}`;
    },
  },
  methods: {
    target() {
      return (cordova.platformId === 'browser') ? '_self' : '_blank';
    },
  },
};
</script>

<style lang="scss" scoped>
.courses-information {
  width: 100%;
  word-break: break-all;

  td {
    a {
      color: #0061ca;
      text-decoration: none;
    }
  }
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
    width: 100%;
    height: auto;
  }
}
</style>
