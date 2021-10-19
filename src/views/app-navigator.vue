<template>
  <v-ons-navigator
    :page-stack="pageStack"
    :pop-page="popPage"
    @deviceBackButton="deviceBackButton"
  />
</template>

<script>
import StartIndex from '@/views/start';
import settings from '@/config/settings';

export default {
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
      if (tabbarActiveIndex === settings.views.appTabbar.tabIndexes.courseWeather) {
        this.$store.commit('components/confirmAppExitDialog/setVisible', true);
      } else {
        this.resetTabPage(tabbarActiveIndex);
      }

      return event.preventDefault();
    },
    resetTabPage(tabbarActiveIndex) {
      switch (tabbarActiveIndex) {
      case settings.views.appTabbar.tabIndexes.courseSearch:
        if (this.$store.state.courseSearchNavigator.stack.length > 1) {
          this.$store.dispatch('courseSearchNavigator/pop');
        } else {
          this.$store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.courseWeather);
        }
        break;
      case settings.views.appTabbar.tabIndexes.scores:
        if (this.$store.state.scoresNavigator.stack.length > 1) {
          this.$store.dispatch('scoresNavigator/pop');
        } else {
          this.$store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.courseWeather);
        }
        break;
      case settings.views.appTabbar.tabIndexes.windForecast:
        if (this.$store.state.windForecastNavigator.stack.length > 1) {
          this.$store.dispatch('windForecastNavigator/pop');
        } else {
          this.$store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.courseWeather);
        }
        break;
      case settings.views.appTabbar.tabIndexes.menu:
        if (this.$store.state.menuNavigator.stack.length > 1) {
          this.$store.dispatch('menuNavigator/pop');
        } else {
          this.$store.commit('appTabbar/setActiveIndex', settings.views.appTabbar.tabIndexes.courseWeather);
        }
        break;
      default:
        break;
      }
    },
  },
};
</script>
