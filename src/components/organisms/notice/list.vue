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
            <span class="list-item__title">{{ notice.title }}</span>
            <span class="list-item__subtitle">
              {{ notice.startedAt }}
              <label
                v-if="!notice.isRead"
                class="label-unread"
              />
            </span>
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
  flex-flow: wrap-reverse;
  min-width: 0;
  padding-top: 20px;
  padding-right: 0;
  padding-bottom: 18px;
}

.list-item {
  padding-left: 0;

  &__title {
    overflow: hidden;
    font-size: 18px;
    font-weight: 300;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__subtitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: $font-size-small;
    font-weight: 300;
    color: $color-subtext;
    opacity: 1;
  }
}

.label-unread {
  width: 24px;
  height: 8px;
  background-color: #f89f9f;
  border-radius: 10px;
}
</style>
