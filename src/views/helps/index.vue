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
  data() {
    return {
      helps: [
        {
          id: 1,
          title: 'Help 1',
          description: 'Help 1',
          image: {
            url: 'https://via.placeholder.com/150',
          },
        },
        {
          id: 2,
          title: 'Help 2',
          description: 'Help 2',
          image: {
            url: 'https://via.placeholder.com/150',
          },
        },
        {
          id: 3,
          title: 'Help 3',
          description: 'Help 3',
          image: {
            url: 'https://via.placeholder.com/150',
          },
        },
      ],
    };
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
