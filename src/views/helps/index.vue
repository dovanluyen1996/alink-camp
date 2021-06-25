<template>
  <v-ons-page>
    <custom-toolbar title="ヘルプ" />

    <div class="content">
      <help-list @click="showHelp" />

      <fixed-footer>
        <v-ons-button
          modifier="large--cta rounded"
          @click="goToContact"
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
  methods: {
    showHelp(helpId) {
      this.$store.dispatch('menuNavigator/push', {
        extends: ShowHelpView,
        onsNavigatorProps: {
          helpId,
        },
      });
    },
    goToContact() {
      this.$store.dispatch('menuNavigator/push', ContactView);
    },
  },
};
</script>
