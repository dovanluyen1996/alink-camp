<template>
  <div class="campsites-information-tab">
    <div class="wrapper-table">
      <div class="custom-table">
        <table class="campsites-information">
          <tr>
            <th
              class="th"
              scope="row"
            >
              住所
            </th>
            <td>
              {{ campsite.address }}
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
                v-if="campsite.phone"
                :href="`tel:${campsite.phone}`"
              >
                {{ campsite.phone }}
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
                v-if="campsite.phone2"
                :href="`tel:${campsite.phone2}`"
              >
                {{ campsite.phone2 }}
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
                v-if="campsite.url"
                @click="openPage(campsite.url)"
              >
                {{ campsite.url }}
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
                v-if="campsite.jalanUrl"
                @click="openPage(campsite.jalanUrl)"
              >
                {{ campsite.jalanUrl }}
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
              {{ campsite.jalanDescription }}
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
              {{ campsite.note }}
            </td>
          </tr>
        </table>

        <div class="campsite-image">
          <img :src="campsite.jalanImagePath">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CampsitesInformationTab',
  computed: {
    campsite() {
      // TODO: Hanlde campsite choosen
    },
    mapUrl() {
      return `https://maps.google.com/?q=${encodeURI(this.campsite.name)}`;
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
.campsites-information {
  width: 100%;
  word-break: break-all;

  td {
    a {
      color: #9883de;
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
  color: #9883de;

  &__target {
    position: absolute;
    top: -10px;
    right: -10px;
    bottom: -10px;
    left: -10px;
    text-decoration: none;
  }
}

.campsite-image {
  margin-top: 15px;
  text-align: center;

  img {
    width: 100%;
    height: auto;
  }
}

.wrapper-table {
  width: 100%;
  padding: 10px 0 30px;
  margin-bottom: 30px;
  background: #fff;
}

.custom-table {
  padding: 0 10px;
}
</style>
