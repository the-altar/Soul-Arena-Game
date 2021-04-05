const joinLobby = function() {
  this.$store.dispatch("audio/playBlocked");
  this.alertSystem({
    msg: "This isn't working yet, sorry!",
    status: "warning",
  });
};

const joinMatchMake = async function(roomName) {
  if (this.gameRoom !== null) {
    this.gameRoom.leave();
    return;
  }

  if (!this.currentTeam.full) {
    this.$store.dispatch("audio/playBlocked");
    this.alertSystem({
      msg: "You need exactly 3 characters to start a game!",
      status: "warning",
    });
    return;
  }

  if (
    this.searchingGame ||
    this.searchingQuickGame ||
    this.searchingRankedGame
  ) {
    this.alertSystem({
      msg: "You're already looking for a game!",
      status: "warning",
    });
    return;
  }

  this.searchingGame = true;
  if (roomName === "rankedLobby") {
    this.searchingRankedGame = true;
  } else {
    this.searchingQuickGame = true;
  }

  this.$store.dispatch("audio/playSnap");
  try {
    this.gameRoom = await this.$colyseus.joinOrCreate(roomName, {
      team: this.currentTeamIds,
      player: this.$store.getters["user/getUserData"],
    });

    this.gameRoom.onMessage("connected_clients", async (info) => {
      this.clients = info;
    });
    this.gameRoom.onMessage("seat", async (reservation) => {
      try {
        const battleRoom = await this.$colyseus.consumeSeatReservation(
          reservation
        );

        this.$store.commit("game/setRoom", battleRoom);
        sessionStorage.setItem("ingame", true);
        localStorage.setItem(
          "battle",
          JSON.stringify({
            roomId: battleRoom.id,
            sessionId: battleRoom.sessionId,
          })
        );

        this.battleRoom.onMessage("game-started", (p) => {
          this.$store.dispatch("audio/changeIntoBattle");
          this.$store.commit("game/setGameState", p);
          const myId = this.$store.getters["user/getUserData"].id;
          this.$store.commit(
            "game/setTurnStatus",
            !this.$store.getters["game/GetMyData"](myId).isTurn
          );
          this.$store.commit("game/setLive", true);
          this.$router.push({ name: "ingame" });
        });

        this.gameRoom.leave();
      } catch (err) {
        this.alertSystem({
          msg: err,
          status: "warning",
        });
      }
    });

    this.gameRoom.onLeave(async () => {
      this.gameRoom = null;
      this.searchingGame = false;
      this.searchingRankedGame = false;
      this.searchingQuickGame = false;
      this.clients = 0;
    });
  } catch (error) {
    this.searchingGame = false;
    this.alertSystem({
      msg: error,
      status: "warning",
    });
  }
};

const removeCharByIndex = async function(index) {
  if (this.searchingGame) return;
  this.$store.commit("game/removeCharByIndex", index);
};

const handleDrop = function(index, transferData) {
  if (this.searchingGame) return;
  if (!transferData) return;
  if (
    !(
      this.userData.unlocked.includes(transferData.id) ||
      transferData.isFree ||
      this.userData.rank.authLevel > 100
    )
  )
    return;
  this.$store.commit("game/addToTeamAtIndex", {
    char: transferData,
    index: index,
  });
};

const openPlayerModal = function() {
  this.$store.getters["user/modalStates"].profile = true;
};

export default {
  joinLobby,
  handleDrop,
  joinMatchMake,
  openPlayerModal,
  removeCharByIndex,
};
