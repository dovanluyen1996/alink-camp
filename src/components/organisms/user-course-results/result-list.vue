<template>
  <v-ons-list>
    <v-ons-list-item
      v-for="userCourseResult in userCourseResults"
      :key="userCourseResult.id"
      modifier="chevron"
      @click="clickUserCourseResult(userCourseResult)"
    >
      <div class="center user-course-result">
        {{ displayTargetDate(userCourseResult.targetDate) }}
      </div>
    </v-ons-list-item>
  </v-ons-list>
</template>

<script>
export default {
  name: 'UserCourseResultsList',
  props: {
    userCourseResults: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    displayTargetDate(targetDate) {
      return this.$helpers.toLongString(targetDate);
    },
    clickUserCourseResult(userCourseResult) {
      this.$emit('clickUserCourseResult', userCourseResult);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-course-result {
  justify-content: center;
  font-size: 18px;
}
</style>
