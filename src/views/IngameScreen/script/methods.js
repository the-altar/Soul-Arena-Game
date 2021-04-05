const endTurn = function() {
  if (this.isBusy) return;
  if (this.$store.getters["game/turnStatus"]) {
    this.alertSystem({
      msg: "your turn has already ended!",
      status: "warning",
    });
    return;
  }
  if (this.tempSkillQueue.length > 0) {
    this.endturn = true;
  } else {
    this.$store.commit("game/setTurnStatus", true);
    this.$store.commit("game/setBusyStatus", true);
    const room = this.$store.getters["game/getBattleRoom"];
    room.send("end-game-turn");
  }
};

const surrender = function() {
  if (this.isBusy) return;
  this.wantToSurrender = true;
};

const sendMessage = function(msg) {
  if (this.isBusy) return;
  const room = this.$store.getters["game/getBattleRoom"];
  const username = this.$store.getters["user/getUserData"].username;
  room.send("send-message", { username, msg });
};

const selectUserView = function(user) {
  this.$eventBus.$emit("selected-an-user", user);
};

const notImplemented = function() {
  this.alertSystem({ msg: "not implemented.. yet!", status: "warning" });
};

export default {
  endTurn,
  surrender,
  sendMessage,
  selectUserView,
  notImplemented,
};
