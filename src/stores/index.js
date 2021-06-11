import Vue from 'vue';
import Vuex from 'vuex';
import modules from '@/stores/modules';
import models from '@/stores/models';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ...modules,
    models,
  },
});
