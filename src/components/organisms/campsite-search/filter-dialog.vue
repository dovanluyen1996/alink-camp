<template>
  <v-ons-alert-dialog :visible="isVisibleFiltering">
    <template #title>
      絞り込み
    </template>

    <campsite-search-conditions-facility
      ref="facilityCondition"
    />

    <template #footer>
      <v-ons-button
        class="button--search"
        modifier="large--cta rounded yellow"
        :disabled="searched"
        @click="filter()"
      >
        絞り込み検索
      </v-ons-button>
    </template>
  </v-ons-alert-dialog>
</template>

<script>
// components
import CheckField from '@/components/organisms/form/check-field';
import CampsiteSearchConditionsFacility from '@/components/organisms/campsite-search/conditions-facility';


export default {
  components: {
    CheckField,
    CampsiteSearchConditionsFacility,
  },
  props: {
    isVisibleFiltering: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    filter() {
      // TODO: Implement function when search camp
      this.$emit('filter', this.$refs.facilityCondition.searchParams());
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/ {
  .content-with-footer__content {
    position: relative;
    z-index: 99;
  }

  .alert-dialog-container {
    max-height: 78vh;
    overflow: scroll;
  }

  .alert-dialog-title {
    margin-bottom: 0;
  }

  .alert-dialog-content {
    padding: 0;
  }

  .alert-dialog-footer {
    display: flex;

    & > ons-button {
      margin: 5px;
    }
  }
}
</style>
