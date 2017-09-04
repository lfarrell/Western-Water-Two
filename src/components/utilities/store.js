import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    whichState: 'main'
  },

  mutations: {
    increment (state) {
      state.count++
    }
  }
});
