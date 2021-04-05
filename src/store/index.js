import Vue from "vue";
import Vuex from "vuex";

import user from "./user";
import Roster from "./roster";
import game from "./game";
import midori from "./midori";
import enums from "./enums";
import audio from "./audio";
import lobby from "./lobby";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    audio,
    user,
    Roster,
    game,
    midori,
    enums,
    lobby,
  },
  state: {
    theme: "",
    activeModal: null,
  },
  mutations: {
    SET_THEME(state, theme) {
      state.theme = theme;
    },
    SET_ACTIVE_MODAL(state, code) {
      state.activeModal = code;
    },
  },
  getters: {
    GET_THEME: function(state) {
      return state.theme;
    },
    GET_ACTIVE_MODAL: function(state) {
      return state.activeModal;
    },
  },
});
