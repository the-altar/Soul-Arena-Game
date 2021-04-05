export default {
  data() {
    return {
      $modalCodes: {
        userModal: 101,
        sendMessagePrompt: 102,
      },
    };
  },
  computed: {
    theme() {
      return this.$store.getters["GET_THEME"];
    },
    user() {
      return this.$store.getters["user/getUserData"];
    },
    activeModal() {
      return this.$store.getters["GET_ACTIVE_MODAL"];
    },
  },
  methods: {
    alertSystem({ msg, status }) {
      this.$store.commit("lobby/SET_NOTIFICATION_MESSAGE", {
        msg,
        status,
      });
      this.$store.commit("SET_ACTIVE_MODAL", 0);
    },
    clearAlert() {
      this.$store.commit("lobby/SET_NOTIFICATION_MESSAGE", "");
      this.$store.commit("SET_ACTIVE_MODAL", null);
    },
    $clearModal() {
      this.$store.commit("SET_ACTIVE_MODAL", null);
    },
    $setModalCode(code) {
      this.$store.commit("SET_ACTIVE_MODAL", code);
    },
  },
};
