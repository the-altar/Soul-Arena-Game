export default {
  namespaced: true,
  state: {
    data: [],
    isLoaded: false,
  },
  mutations: {
    setData: function(state, payload) {
      state.data = payload
        .map((s) => {
          return s.data;
        })
        .sort((a, b) => {
          return a.dexNumber - b.dexNumber;
        });
      state.isLoaded = true;
    },
  },
  getters: {
    findPokemonById: function(state) {
      return (id) => {
        for (const i in state.data) {
          if (state.data[i].id === id) return state.data[i];
        }
      };
    },
    getRoster: function(state) {
      return state.data;
    },
  },
};
