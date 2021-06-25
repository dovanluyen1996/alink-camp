<template>
  <v-ons-page>
    <custom-toolbar :title="help.title" />

    <div class="content">
      <help-detail :help="help" />
    </div>
  </v-ons-page>
</template>

<script>
import HelpDetail from '@/components/organisms/help/detail';

export default {
  name: 'HelpShow',
  components: {
    HelpDetail,
  },
  props: {
    helpId: {
      type: Number,
      required: true,
    },
  },
  computed: {
    help() {
      return this.$store.getters['models/help/findById'](this.helpId);
    },
  },
};
</script>
