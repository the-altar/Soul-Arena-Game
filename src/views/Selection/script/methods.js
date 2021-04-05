const updateView = function(payload) {
  this.component = payload.component;
  this.viewData = payload.data;
  this.banner = payload.data.banner;
};

const setChar = function(char) {
  this.component = "CharacterDetailProfile";
  this.selectedChar = char;
  this.viewData = char;
  this.banner = char.banner;
};

const addToTeam = function(char = false) {
  if (char !== false) {
    this.$store.commit("game/addToTeam", char);
  }
  this.$store.commit("game/addToTeam", this.selectedChar);
};

export default {
  updateView,
  addToTeam,
  setChar,
};
