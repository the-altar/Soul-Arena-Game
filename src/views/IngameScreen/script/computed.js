const Game = function() {
  return this.$store.state.game;
};

const GetMyData = function() {
  const myId = this.$store.getters["user/getUserData"].id;
  return this.$store.getters["game/GetMyData"](myId);
};

const myEnemyData = function() {
  const myId = this.$store.getters["user/getUserData"].id;
  return this.$store.getters["game/myEnemyData"](myId);
};

const isTurn = function() {
  const myId = this.$store.getters["user/getUserData"].id;
  return this.$store.getters["game/GetMyData"](myId).isTurn;
};

const tempSkillQueue = function() {
  return this.$store.getters["game/getTempQueue"];
};

const isBusy = function() {
  return this.$store.getters["game/isBusy"];
};

const reiatsuTypes = function() {
  return this.$store.getters["enums/getEnum"]("reiatsuTypings");
};

const gameRoom = function() {
  return this.$store.getters["game/getBattleRoom"];
};

const gameIsLive = function() {
  return this.$store.getters["game/isLive"];
};

export default {
  Game,
  gameRoom,
  gameIsLive,
  isBusy,
  isTurn,
  GetMyData,
  reiatsuTypes,
  myEnemyData,
  tempSkillQueue,
};
