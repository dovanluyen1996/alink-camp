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
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 08c55f2 (Fix convention)
          v-for="help in helps"
          :key="help.id"
          @click="showHelp(help.id)"
=======
          v-for="help in list"
          :key="help.id"
          @click="showhelp(help.id)"
>>>>>>> a787c93 (mock api helps)
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
import ShowHelpPage from '@/views/helps/show';

export default {
  data() {
    return {
<<<<<<< HEAD
<<<<<<< HEAD
      helps: [
=======
      list: [
>>>>>>> a787c93 (mock api helps)
=======
      helps: [
>>>>>>> 08c55f2 (Fix convention)
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
    showHelp(id) {
      const selectedHelp = this.list.find(help => help.id === id);
      this.$store.dispatch('menuNavigator/push', {
        extends: ShowHelpPage,
        data() {
          return {
            help: selectedHelp,
          };
        },
      });
    },
  },
};
</script>
