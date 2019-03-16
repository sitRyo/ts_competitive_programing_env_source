import Vue from 'vue';
import Vuex from 'vuex';
import executedata from './modules/ExecuteData';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    executedata,
  },
});
