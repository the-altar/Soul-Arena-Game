export default {
  namespaced: true,
  state: {
    user: null,
    modals: {
      profile: false,
    },
  },
  mutations: {
    SET_USER: function(state, payload) {
      state.user = { ...payload };
    },
    UPDATE_USER_AFTERMATCH: function(state, payload) {
      state.user.coins = payload.coins;
      state.user.season = payload.season;
    },
    SET_PROFILE_MODAL: function(state, status) {
      state.modals.profile = status;
    },
  },
  getters: {
    getUserData: (state) => {
      return state.user;
    },
    ranked: (state) => {
      return { elo: state.user.elo, id: state.user.id };
    },
    modalStates: (state) => {
      return state.modals
    },
  },
  actions: {},
};
