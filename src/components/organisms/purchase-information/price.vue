<template>
  <div class="purchase-information-price">
    <table class="purchase-information-price__table">
      <tr>
        <th
          scope="col"
          class="purchase-information-price__service purchase-information-price__service--header"
        >
          機能
        </th>
        <th
          scope="col"
          class="purchase-information-price__free purchase-information-price__free--header"
        >
          非会員
        </th>
        <th
          scope="col"
          class="purchase-information-price__member purchase-information-price__member--header"
        >
          会員
        </th>
      </tr>
      <tr
        v-for="(service, index) in services"
        :key="index"
      >
        <th
          scope="row"
          class="purchase-information-price__service"
          v-html="service.name"
        ></th>
        <td
          class="purchase-information-price__free"
          v-html="service.free"
        ></td>
        <td
          class="purchase-information-price__member"
          v-html="service.member"
        ></td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PurchaseInformationPrice',
  data() {
    return {
      services: [
        {
          name: '天気予報',
          free: '◎',
          member: '◎',
        },
        {
          name: '時間ごとの天気予報',
          free: '◎',
          member: '◎',
        },
        {
          name: '各種指数',
          free: '-',
          member: '落雷<br>服装<br>紫外線<br>星空',
        },
        {
          name: '長期的な天気傾向<br>（1ヶ月または1年）',
          free: '-',
          member: '気温<br>降水量<br>晴天率',
        },
        {
          name: 'キャンプ場検索',
          free: '都道府県<br>施設条件<br>現在位置',
          member: '都道府県<br>施設条件<br>気象条件<br>現在位置',
        },
        {
          name: '雨雲レーダー',
          free: '◎',
          member: '◎',
        },
        {
          name: 'キャンプ計画',
          free: '1件',
          member: '複数',
        },
        {
          name: 'PUSH通知の種類',
          free: '予定日の天気<br>日の入<br>気温差',
          member: '予定日の天気<br>雨雲の接近<br>落雷突風危険度<br>予報の変化<br>日の入<br>気温差<br>忘れ物',
        },
        {
          name: 'ログインキャンペーン',
          free: '-',
          member: '◎',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

@mixin header-text {
  font-size: $font-size-large;
  font-weight: bold;
  border-top: none;
}

@mixin member-decoration-base {
  position: absolute;
  right: 0;
  width: 100%;
  height: 11px;
  content: '';
}

@mixin member-decoration-shadow {
  position: absolute;
  left: -6px;
  width: 0;
  height: 0;
  content: '';
}

.purchase-information-price {
  padding: 20px 10px;
  background: #f2ebd3;

  &__table {
    width: 100%;
  }

  th,
  td {
    padding: 6px 5px;
    text-align: center;
    vertical-align: middle;
  }

  &__service {
    font-weight: normal;
    background: $color-th;
    border-left: none;

    &--header {
      @include header-text;

      background: #ddddd6;
      border-top-left-radius: 6px;
    }
  }

  &__free {
    color: $color-purchase-gold;
    white-space: nowrap;
    background: #fff;

    &--header {
      @include header-text;

      background: #eee;
    }
  }

  &__member {
    font-weight: bold;
    color: $color-purchase-gold;
    white-space: nowrap;
    background: $color-purchase-dark;
    border-right: none;
  }

  &__member--header {
    @include header-text;

    position: relative;
    font-size: 20px;
    color: #fff;
    background: $color-purchase-gold;

    &::before {
      @include member-decoration-base;

      top: -10px;
      background: $color-purchase-gold;
      border-top-right-radius: 6px;
    }

    &::after {
      @include member-decoration-shadow;

      top: -10px;
      border-top: 10px solid transparent;
      border-right: 6px solid #9a7e27;
      border-bottom: none;
      border-left: none;
    }
  }

  tr:last-child {
    th,
    td {
      border-bottom: none;
    }

    .purchase-information-price__service {
      border-bottom-left-radius: 6px;
    }

    .purchase-information-price__member {
      position: relative;

      &::before {
        @include member-decoration-base;

        bottom: -10px;
        background: $color-purchase-dark;
        border-bottom-right-radius: 6px;
      }

      &::after {
        @include member-decoration-shadow;

        bottom: -10px;
        border-top: none;
        border-right: 6px solid #23252c;
        border-bottom: 10px solid transparent;
        border-left: none;
      }
    }
  }
}

</style>
