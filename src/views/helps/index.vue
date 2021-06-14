<template>
  <v-ons-page>
    <v-ons-toolbar>
      <div class="left">
        <v-ons-back-button />
      </div>
      <div class="center">
        ヘルプ
      </div>
    </v-ons-toolbar>
    <v-ons-card>
      <v-ons-list>
        <v-ons-list-item
          v-for="help in helps"
          :key="help.id"
          @click="showHelp(help.id)"
        >
          <div>
            <p>{{ help.title }}</p>
          </div>
        </v-ons-list-item>
      </v-ons-list>
    </v-ons-card>
  </v-ons-page>
</template>

<script>
import ShowHelpView from '@/views/helps/show';
export default {
  computed: {
    helps() {
      return this.$store.getters['models/help/all'];
    },
  },
  async created() {
    await this.getHelps();
  },
  methods: {
    showHelp(helpId) {
      this.$store.dispatch('menuNavigator/push', {
        extends: ShowHelpView,
        onsNavigatorProps: {
          helpId,
        },
      });
    },
    async getHelps() {
      await this.$store.dispatch('models/help/getHelps');
    },
  },
};
</script>
