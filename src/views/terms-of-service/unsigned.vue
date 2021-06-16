<template>
  <v-ons-page>
    <custom-toolbar title="利用規約" />
    <div class="background" />
    <div class="content">
      <terms-of-service-description />
    </div>
    <ons-bottom-toolbar modifier="transparent">
      <v-ons-button
        class="button-disagree"
        @click="disagree"
      >
        同意しない
      </v-ons-button>
      <v-ons-button @click="goToFirstGuidance">
        同意する
      </v-ons-button>
    </ons-bottom-toolbar>
  </v-ons-page>
</template>

<script>
// components
import TermsOfServiceDescription from '@/components/organisms/terms-of-service/description';

// pages
import FirstGuidance from '@/views/first-guidance';

export default {
  name: 'TermsOfServiceUnsigned',
  components: {
    TermsOfServiceDescription,
  },
  methods: {
    disagree() {
      // TODO: force quit app if disagree term
      this.$store.dispatch('appNavigator/pop');
    },
    goToFirstGuidance() {
      localStorage.setItem('acceptedTermOfService', true);
      this.$store.dispatch('appNavigator/push', FirstGuidance);
    },
  },
};
</script>

<style lang="scss" scoped>
.background {
  background: #fff;
}

.terms-of-service-description {
  padding: 20px;
  font-size: 16px;
}

.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  .button {
    width: 140px;
    font-size: 16px;
  }

  .button-disagree {
    margin-right: 20px;
    color: #010910;
    background: #d9d9d9;
  }
}
</style>
