<template>
  <div>
    <v-ons-navigator
      :page-stack="pageStack"
      :pop-page="popPage"
      @deviceBackButton="deviceBackButton"
    />

    <confirm-app-exit-dialog :is-shown.sync="confirmAppExitVisible" />
  </div>
</template>

<script>
import StartIndex from '@/views/start';
import settings from '@/config/settings';
import ConfirmAppExitDialog from '@/components/organisms/dialog/confirm-app-exit-dialog';

export default {
  components: {
    ConfirmAppExitDialog,
  },
  data() {
    return {
      confirmAppExitVisible: false,
    };
  },
  computed: {
    pageStack() {
      return this.$store.state.appNavigator.stack;
    },
  },
  created() {
    this.$store.dispatch('appNavigator/push', StartIndex);
  },
  methods: {
    popPage() {
      this.$store.dispatch('appNavigator/pop');
    },
    deviceBackButton(event) {
      // check appTabbar index
      const tabbarActiveIndex = this.$store.state.appTabbar.activeIndex;

      // If active index is App Top -> move to background
      //
      // If active index isn't App Top
      // -> check is open other page in each tab
      //    -> If open other page -> back to previous screen like button 「<」
      //    -> If is openning Top Page of Tab -> set Active Tab to App Top
      if (tabbarActiveIndex === settings.views.appTabbar.tabIndexes.campsiteWeather) {
        this.confirmAppExitVisible = true;
      } else {
        this.resetTabPage(tabbarActiveIndex);
      }

      return event.preventDefault();
    },
    resetTabPage(tabbarActiveIndex) {
      switch (tabbarActiveIndex) {
      case settings.views.appTabbar.tabIndexes.campsiteSearch:
        if (this.$store.state.campsiteSearchNavigator.stack.length > 1) {
          this.$store.dispatch('campsiteSearchNavigator/pop');
        } else {
          this.$store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.campsiteWeather);
        }
        break;
      case settings.views.appTabbar.tabIndexes.plans:
        if (this.$store.state.plansNavigator.stack.length > 1) {
          this.$store.dispatch('plansNavigator/pop');
        } else {
          this.$store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.campsiteWeather);
        }
        break;
      case settings.views.appTabbar.tabIndexes.spotSearch:
        if (this.$store.state.spotSearchNavigator.stack.length > 1) {
          this.$store.dispatch('spotSearchNavigator/pop');
        } else {
          this.$store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.campsiteWeather);
        }
        break;
      case settings.views.appTabbar.tabIndexes.menu:
        if (this.$store.state.menuNavigator.stack.length > 1) {
          this.$store.dispatch('menuNavigator/pop');
        } else {
          this.$store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.campsiteWeather);
        }
        break;
      default:
        break;
      }
    },
  },
};
</script>
