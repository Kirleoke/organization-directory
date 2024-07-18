import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    organizations: [],
  },
  mutations: {
    addOrganization(state, organization) {
      state.organizations.push(organization);
    },
    removeOrganization(state, index) {
      state.organizations.splice(index, 1);
    },
  },
});
