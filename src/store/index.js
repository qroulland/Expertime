import Vue from 'vue'
import Vuex from 'vuex'
import brands from '../assets/data/brands.json'
import payloads from '../assets/data/payload-rmp.json'
import medias from '../assets/data/medias.json'


Vue.use(Vuex)

/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    brands,
    payloads,
    medias
  },
  mutations: {
    UPDATE_VALUE(state, object) {
      const index = state.payloads.requests.findIndex((elt) => elt.requestId === object.requestId)
      state.payloads.requests[index] = object
    }
  },
  actions: {
    updateValue({ commit }, object) {
      commit('UPDATE_VALUE', object)
    }
  }
})

export default store
