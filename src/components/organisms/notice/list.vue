<template>
  <v-ons-card>
    <div class="content">
      <v-ons-list modifier="noborder">
        <v-ons-list-item
          v-for="notice in notices"
          :key="notice.id"
          modifier="longdivider"
          @click="clickNotice(notice)"
        >
          <div class="center">
            <div class="notice-started-at">
              {{ notice.startedAt }}
              <span
                v-if="!notice.isRead"
                class="label-unread"
              />
            </div>
            <span class="list-item__title">{{ notice.title }}</span>
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </div>
  </v-ons-card>
</template>

<script>
export default {
  name: 'NoticeList',
  props: {
    notices: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    clickNotice(notice) {
      this.$emit('click', notice.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.card {
  padding-top: 4px;
  padding-bottom: 0;
}

.center {
  min-width: 0;
  padding-top: 20px;
  padding-right: 0;
  padding-bottom: 18px;
}

.list-item {
  &__title {
    overflow: hidden;
    font-size: 18px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.notice-started-at {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
  font-size: $font-size-small;
  color: $color-subtext;
}

.label-unread {
  width: 24px;
  height: 8px;
  background-color: #f89f9f;
  border-radius: 10px;
}
</style>
