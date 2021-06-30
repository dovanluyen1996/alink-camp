<template>
  <v-ons-page>
    <custom-toolbar title="定期購読に関して" />

    <div class="content">
      <card-with-tab
        :tabs="tabs"
        fullscreen
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
};
</script>
