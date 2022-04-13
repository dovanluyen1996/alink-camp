<template>
  <div>
    <v-ons-card v-if="helps.length > 0">
      <div class="content">
        <v-ons-list modifier="noborder">
          <v-ons-list-item
            v-for="help in helps"
            :key="help.id"
            modifier="longdivider"
            @click="clickHelp(help)"
          >
            <div class="center">
              <span class="list-item__title">{{ help.title }}</span>
            </div>
          </v-ons-list-item>
        </v-ons-list>
      </div>
    </v-ons-card>
  </div>
</template>

<script>
export default {
  name: 'HelpList',
  computed: {
    helps() {
      return this.$store.getters['models/help/all'];
    },
  },
  async created() {
    await this.getHelps();
  },
  methods: {
    clickHelp(help) {
      this.$emit('click', help.id);
    },
    async getHelps() {
      await this.$store.dispatch('models/help/getHelps');
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  padding-top: 0;
  padding-bottom: 0;
}

.center {
  min-width: 0;
  padding-top: 25px;
  padding-bottom: 20px;
}

.list-item {
  &__title {
    overflow: hidden;
    font-size: 18px;
    font-weight: normal;
    line-height: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
