<template>
  <v-ons-page>
    <custom-toolbar title="ヘルプ" />

    <div class="content">
      <content-with-footer>
        <help-list @click="showHelp" />

        <template #footer>
          <v-ons-button
            modifier="large--cta rounded"
            @click="goToContact"
          >
            お問い合わせ
          </v-ons-button>
        </template>
      </content-with-footer>
    </div>
  </v-ons-page>
</template>

<script>
// components
import HelpList from '@/components/organisms/help/list';
import ContentWithFooter from '@/components/organisms/content-with-footer';

// views
import ShowHelpView from '@/views/helps/show';
import ContactView from '@/views/contact/index';

export default {
  name: 'HelpsIndex',
  components: {
    HelpList,
    ContentWithFooter,
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

<style lang="scss" scoped>
/deep/ {
  .button--rounded {
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.4);
  }
}
</style>
