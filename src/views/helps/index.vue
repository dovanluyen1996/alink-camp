<template>
  <v-ons-page>
    <custom-toolbar title="ヘルプ" />

    <div class="content">
      <help-list
        v-if="helps.length > 0"
        :helps="helps"
        @click="showHelp"
      />

      <fixed-footer>
        <v-ons-button
          modifier="large--cta rounded"
          @click="goToContactUs"
        >
          お問い合わせ
        </v-ons-button>
      </fixed-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import HelpList from '@/components/organisms/help/list';
import FixedFooter from '@/components/organisms/fixed-footer';

// views
import ShowHelpView from '@/views/helps/show';
import ContactView from '@/views/contact/index';

export default {
  name: 'HelpsIndex',
  components: {
    HelpList,
    FixedFooter,
  },
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
    goToContactUs() {
      // TODO: handle go to contact us page
    },
    async getHelps() {
      await this.$store.dispatch('models/help/getHelps');
    },
    goToContact() {
      this.$store.dispatch('menuNavigator/push', ContactView);
    },
  },
};
</script>
