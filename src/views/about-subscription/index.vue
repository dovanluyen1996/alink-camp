<template>
  <v-ons-page>
    <custom-toolbar title="定期購読に関して" />

    <div class="content">
      <card-with-tab
        :tabs="tabs"
        fullscreen
        :active-index="activeIndexTab"
        @switchTab="switchTab"
      />
    </div>
  </v-ons-page>
</template>

<script>
// components
import CardWithTab from '@/components/organisms/card-with-tab';

// tab contents
import AboutSubscriptionAppStoreTab from '@/components/organisms/about-subscription/app-store-tab';
import AboutSubscriptionGooglePlaytab from '@/components/organisms/about-subscription/google-play-tab';

export default {
  name: 'AboutSubscription',
  components: {
    CardWithTab,
  },
  data() {
    return {
      tabs: [
        {
          name: 'appStore',
          label: 'App Store',
          component: AboutSubscriptionAppStoreTab,
        },
        {
          name: 'googlePlay',
          label: 'Google Play',
          component: AboutSubscriptionGooglePlaytab,
        },
      ],
    };
  },
  computed: {
    activeIndexTab() {
      return this.$store.state.components.cardWithTab.aboutSubscriptionActiveIndex;
    },
  },
  created() {
    this.resetCardWithTab();
    this.getSubscription();
  },
  methods: {
    async getSubscription() {
      await this.$store.dispatch('models/subscription/getSubscription');
    },
    switchTab(index) {
      this.$store.commit('components/cardWithTab/setAboutSubscriptionActiveIndex', index);
    },
    resetCardWithTab() {
      this.$store.commit('components/cardWithTab/resetAboutSubscriptionActiveIndex');
    },
  },
};
</script>
