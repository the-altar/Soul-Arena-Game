import getters from "./getters";

export default {
  namespaced: true,
  state: {
    playerId: "",
    players: [{}, {}],
    characters: [{}, {}, {}],
    skillQueue: [],
    currentTeam: {
      members: [{}, {}, {}],
      count: 0,
      full: false,
    },
    tempQueue: [],
    room: null,
    skillInFocus: null,
    payupCart: null,
    isBusy: false,
    isLive: false,
    turnEnded: false,
  },
  getters,
  mutations: {
    setBusyStatus: function(state, status) {
      state.isBusy = status;
    },
    setGameState: function(state, payload) {
      state.playerId = payload.playerId;
      state.characters = payload.characters;
      state.players = payload.players;
      state.tempQueue = [];
      state.skillQueue = payload.skillQueue;
    },
    setPlayerEnergyPool: function(state, payload) {
      state.players[payload.playerIndex].energyPool = payload.energyPool;
    },
    setCharacters: function(state, payload) {
      state.characters = payload.characters;
    },
    setRoom: function(state, room) {
      state.room = room;
    },
    addToTeam(state, char) {
      if (state.currentTeam.full === true) {
        return false;
      }

      for (const m of state.currentTeam.members) {
        if (m.id === char.id) return;
      }

      for (let i = 0; i < state.currentTeam.members.length; i++) {
        if (state.currentTeam.members[i].id !== undefined) {
          if (state.currentTeam.members[i].id === char.id) return false;
          else continue;
        } else {
          state.currentTeam.members.splice(i, 1, char);
          state.currentTeam.count++;
          if (state.currentTeam.count === 3) state.currentTeam.full = true;
          return true;
        }
      }
    },
    addToTeamAtIndex(state, payload) {
      for (const m of state.currentTeam.members) {
        if (m.id === payload.char.id) return;
      }

      if (state.currentTeam.members[payload.index].id === undefined)
        state.currentTeam.count++;
      if (state.currentTeam.count === 3) state.currentTeam.full = true;
      state.currentTeam.members.splice(payload.index, 1, payload.char);
    },
    removeCharByIndex(state, index) {
      if (state.currentTeam.members[index].id === undefined) return;
      state.currentTeam.members.splice(index, 1, {});
      state.currentTeam.count--;
      state.currentTeam.full = false;
    },
    setTargetables(state, choices) {
      for (const i in state.characters) {
        if (choices.includes(Number(i))) state.characters[i].isTarget = true;
        else state.characters[i].isTarget = false;
      }
    },
    resetTargetables(state) {
      for (let char of state.characters) {
        char.isTarget = false;
      }
    },
    setSkillInFocus(state, skill) {
      state.skillInFocus = skill;
    },
    setTempQueue(state, payload) {
      state.tempQueue = payload.tempQueue;
      state.characters = payload.characters;
    },
    setPayupCart(state, payload) {
      state.players[payload.p].payupCart = payload.pay;
    },
    resetState(state) {
      state.playerId = "";
      state.players = [{}, {}];
      state.characters = [{}, {}, {}];
      state.skillQueue = [];
      state.tempQueue = [];
      state.room = null;
      state.skillInFocus = null;
      state.payupCart = null;
    },
    setLive(state, status) {
      state.isLive = status;
    },
    setTurnStatus(state, status) {
      state.turnEnded = status;
    },
  },
};
