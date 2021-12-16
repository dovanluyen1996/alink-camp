<template>
  <div class="courses-information-tab">
    <div class="wrapper-table">
      <div class="custom-table">
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
                  class="map-link__target"
                  @click="openPage(mapUrl)"
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
              <a
                v-if="course.phone"
                :href="`tel:${course.phone}`"
              >
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
              <a
                v-if="course.phone2"
                :href="`tel:${course.phone2}`"
              >
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
                v-if="course.url"
                @click="openPage(course.url)"
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
                v-if="course.jalanUrl"
                @click="openPage(course.jalanUrl)"
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
      return `https://maps.google.com/?q=${encodeURI(this.course.name)}`;
    },
  },
  methods: {
    openPage(url) {
      this.$helpers.openPageByUrl(url);
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

.wrapper-table{
  width: 100%;
  margin-bottom: 30px;
  padding: 10px 0 30px;
  background: #fff;
}

.custom-table{
  padding: 0 10px;
}
</style>
