<template>
  <!-- スクロールでthが固定化されるコンポーネント -->
  <div class="sticky-table">
    <table class="table">
      <thead v-if="$slots.thead">
        <slot name="thead" />
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'NoData',
};
</script>

<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.sticky-table {
  box-sizing: border-box;
  width: 100%;
  overflow: auto;
  border: 1px solid $color-border;
}

.table {
  width: 100%;
  font-size: $font-size-small;
  border-spacing: 0;
  border-collapse: separate;

  /deep/ {
    th,
    td {
      border-top: 1px solid $color-border;
      border-right: 1px solid $color-border;
      border-bottom: none;
      border-left: none;
    }

    th:first-child {
      position: -webkit-sticky;
      position: sticky;
      left: 0;
    }

    th:last-child,
    td:last-child {
      border-right: none;
    }

    tr:first-child {
      th,
      td {
        border-top: none;
      }
    }

    thead tr:last-child {
      th,
      td {
        border-bottom: 1px solid $color-border;
      }
    }
  }
}
</style>
