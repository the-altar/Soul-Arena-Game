export default {
  namespaced: true,
  state: {
    room: null,
    notification: {
      message: "",
      status: "",
    },
  },
  getters: {
    GET_ROOM: function(state) {
      return state.room;
    },
    GET_NOTIFICATION_MESSAGE: function(state) {
      return state.notification.message;
    },
    GET_NOTIFICATION_STATUS: function(state) {
      return state.notification.status;
    },
  },
  mutations: {
    SET_ROOM: function(state, room) {
      state.room = room;
    },
    SET_NOTIFICATION_MESSAGE: function(state, { msg, status }) {
      state.notification.message = msg;
      state.notification.status = status;
    },
    DISCONNECT: function(state) {
      state.room.leave();
      state.room = null;
    },
  },
};
