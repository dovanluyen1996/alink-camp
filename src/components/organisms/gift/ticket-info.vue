<template>
  <v-ons-card>
    <div class="content ticket-info">
      <div class="ticket-info-item">
        <label class="ticket-info-item__label">所持応募券</label>
        <p class="ticket-info-item__content">
          <span>{{ ticketCount }}</span>枚
        </p>
      </div>
      <div class="ticket-info-item">
        <label class="ticket-info-item__label">スタンプ</label>
        <p class="ticket-info-item__content">
          <span>{{ userStampNumber }}</span>/10
        </p>
        <span class="ticket-info-item__subcontent">あと〜個で応募券</span>
      </div>
    </div>
  </v-ons-card>
</template>

<script>
export default {
  name: 'TicketInfo',
  props: {
    ticketCount: {
      type: Number,
      default: 0,
      required: true,
    },
    userStampNumber: {
      type: Number,
      default: 0,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';
@import '@/assets/scss/_mixins.scss';

.card {
  padding-top: 14px;
  padding-right: 5px;
  padding-bottom: 14px;
  margin-bottom: 24px;
}

.ticket-info {
  display: flex;
}

.ticket-info-item {
  width: 50%;
  padding-right: 15px;
  text-align: center;

  &__label {
    display: block;
    width: 100%;
    height: 20px;
    font-size: $font-size-small;
    font-weight: 600;
    line-height: 1.7;
    background-color: #f4f4ee;
    border-radius: 22px;
  }

  &__content {
    @include title-style;

    margin: 10px 0;
    line-height: 1;

    span {
      margin-right: 3px;
      font-size: $font-size-xlarge;
      font-weight: 600;
      color: #f53939;
    }
  }

  &__subcontent {
    font-size: $font-size-small;
    font-weight: 300;
  }
}
</style>
