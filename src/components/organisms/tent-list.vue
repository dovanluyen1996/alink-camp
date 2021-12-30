<template>
  <div class="tent-list">
    <v-ons-card>
      <div class="content">
        <v-ons-list>
          <v-ons-list-item
            v-for="tent in tents"
            :key="tent.id"
            modifier="chevron"
          >
            <div :class="['list-item__box', {'list-item--active': tent.user_id}]">
              <div class="center">
                <div class="list-item__title">
                  <span>
                    {{ tent.name }}
                  </span>
                </div>
              </div>
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-card>
  </div>
</template>

<script>
export default {
  name: 'TentList',
  props: {
    tents: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding-top: 5px;
  padding-bottom: 0;
}

.center {
  padding: 20px 0;
}

.list-item {
  padding-left: 0;

  &__box {
    width: 100%;
    padding-left: 7px;
  }

  &--active {
    background-color: #f29678;
  }

  &__title {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    font-size: 18px;
    line-height: 1.2;
  }
}

/deep/ {
  .list-item__center {
    padding: 12px 0;
  }
}
</style>
