import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    connectedStatus: false
  },
  mutations: {
    // template(state, param) {
    //
    // },
    // changeConnectedStatus(state, newStatus) {
    //   state.connectedStatus = newStatus;
    // }
  },
  actions: {
    // cartAdd({ commit }, newOrder) {
    //   commit("cart_add", newOrder);
    // },
  },
  getters: {
    // getCart: state => JSON.parse(state.cart),
  }
});
