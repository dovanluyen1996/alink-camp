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
          〒297-0231 千葉県長生郡長柄町山之郷754-32
          <!-- NOTE: テキストリンクは当たり判定が小さすぎるので広げる処置 -->
          <span class="map-link">
            MAP
            <a
              href="#"
              class="map-link__target"
            />
          </span>
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
          03-9999-9999
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
          03-9999-9999
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
          https://www.hogehoge.com
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
          https://www.hogehoge.com
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
          ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ
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
          ほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげほげ
        </td>
      </tr>
    </table>

    <div class="course-image">
      <img src="@/assets/images/course-sample.jpg">
    </div>
  </div>
</template>

<script>
export default {
  name: 'CoursesInformationTab',
};
</script>

<style lang="scss" scoped>
.courses-information {
  word-break: break-all;
}

.th {
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
