<template>
  <div v-if="gameIsLive" class="ingame" :class="[{ busy: isBusy }, `${theme}`]">
    <section class="ingame-header">
      <!-- PLAYER 1 view -->
      <div class="ingame-player" @click="selectUserView(GetMyData)">
        <img
          class="ingame-player-icon"
          :class="`${theme}-darker`"
          :src="`/img/avatars/${GetMyData.avatar}`"
          alt
        />
        <div class="ingame-player-options">
          <p>
            {{ GetMyData.username }}
          </p>
        </div>
      </div>

      <!-- MIDDLE CONTROL PANEL -->
      <div class="ingame-control">
        <button
          class="ingame-control-btn"
          :class="`${theme}`"
          v-if="GetMyData.isTurn"
          @click="endTurn()"
        >
          PRESS WHEN READY
        </button>
        <div class="ingame-control-timebar">
          <div
            class="ingame-control-timebar-gauge"
            :style="`width: ${timer}%`"
          ></div>
        </div>
        <ul class="ingame-control-energypool" v-if="GetMyData.isTurn">
          <li
            v-for="(amount, key) in GetMyData.energyPool.slice(0, 4)"
            :key="key"
            :class="`${reiatsuTypes[key]} ${reiatsuTypes[key]}-glow`"
          >
            {{ amount }}
          </li>
        </ul>
        <p
          v-if="GetMyData.isTurn"
          @click="wantToExchange = true"
          class="ingame-control-exchange"
        >
          exchange reiatsu
        </p>
      </div>

      <!-- PLAYER 2 view -->
      <div
        class="ingame-player ingame-player-2"
        @click="selectUserView(myEnemyData)"
      >
        <img
          class="ingame-player-icon"
          :class="`${theme}-darker`"
          :src="`/img/avatars/${myEnemyData.avatar}`"
          alt
        />
        <p>
          {{ myEnemyData.username }}
        </p>
      </div>
    </section>

    <section class="ingame-field">
      <MyTeam></MyTeam>
      <EnemyTeam></EnemyTeam>
    </section>

    <section class="ingame-footer">
      <div class="ingame-options">
        <button
          @click="notImplemented"
          class="ingame-btn"
          :class="`${theme} ${theme}-view`"
        >
          Game Log
        </button>
        <button
          @click="$setModalCode(102)"
          class="ingame-btn"
          :class="`${theme} ${theme}-view`"
        >
          Send Message
        </button>
        <button
          @click="surrender"
          class="ingame-btn"
          :class="`${theme} ${theme}-view`"
        >
          Surrender
        </button>
      </div>
      <Viewer></Viewer>
    </section>

    <img
      :class="[
        { 'slide-in': GetMyData.isTurn },
        { fadeout: !GetMyData.isTurn },
      ]"
      class="ingame-body"
      :src="`/themes/${this.theme}/body1.png`"
    />
    <img
      :class="[
        { 'slide-in': !GetMyData.isTurn },
        { fadeout: GetMyData.isTurn },
      ]"
      class="ingame-body"
      :src="`/themes/${this.theme}/body2.png`"
    />
    <!-- MODALS -->
    {{ activeModal }}
    <EnergyCart
      @endturn="endTurn"
      v-if="endturn && GetMyData.isTurn"
      :queue="GetMyData.payupCart"
      @close="endturn = false"
    />
    <Confirmation @close="wantToSurrender = false" v-if="wantToSurrender" />
    <EndGame v-if="gameOver" :data="endGameData" />
    <Exchange v-if="wantToExchange" @close="wantToExchange = false" />
    <SendMessage
      v-if="activeModal === 102"
      :status="activeModal === 102"
      @send-message="sendMessage"
    ></SendMessage>
  </div>
</template>

<script>
import components from "./script/components";
import computed from "./script/computed";
import methods from "./script/methods";
import watch from "./script/watchers";

export default {
  data() {
    return {
      endturn: false,
      timer: 100,
      count: 60,
      tick: null,
      gameOver: false,
      wantToSurrender: false,
      endGameData: null,
      wantToExchange: false,
      notBroken: false,
    };
  },
  components,
  computed,
  methods,
  watch,
  created() {
    const room = this.gameRoom;
    if (room !== null) {
      room.state.listen("turnData", (turnState) => {
        this.$store.commit("game/setBusyStatus", false);
        this.$store.dispatch("audio/playTurnSound");
        clearInterval(this.tick);
        this.timer = 100;
        this.count = 60;
        this.tick = setInterval(() => {
          this.timer = this.timer - 1.66;
          this.count = this.count - 1;
          if (this.timer === 0) {
            clearInterval(this.tick);
          }
        }, 1000);
        this.$store.commit("game/setGameState", JSON.parse(turnState));
        this.$store.commit("game/setLive", true);
        localStorage.setItem(
          "battle",
          JSON.stringify({
            roomId: room.id,
            sessionId: room.sessionId,
          })
        );
        this.$store.commit("game/setTurnStatus", !this.GetMyData.isTurn);
        if (this.GetMyData.isTurn) {
          this.$store.commit("midori/setUpdate", {
            value: true,
            index: 0,
          });
        } else {
          this.$store.commit("midori/setUpdate", {
            value: true,
            index: 1,
          });
        }
      });
      room.onMessage("update-temp-queue", (q) => {
        this.$store.commit("game/setTempQueue", q);
        this.$store.commit("game/setPlayerEnergyPool", {
          playerIndex: q.playerIndex,
          energyPool: q.energyPool,
        });
        this.$store.commit("game/setPayupCart", {
          p: q.playerIndex,
          pay: q.payupCart,
        });
        this.$store.commit("game/setBusyStatus", false);
      });

      room.onMessage("end-game", (finalData) => {
        this.notBroken = true;
        room.leave();
        clearInterval(this.tick);
        this.endGameData = finalData;
        this.endturn = false;
        this.gameOver = true;
        localStorage.removeItem("battle");
        this.$store.commit("game/setBusyStatus", false);
      });

      room.onMessage("exchanged-energy", (p) => {
        this.$store.commit("game/setPlayerEnergyPool", p);
        this.$store.commit("game/setCharacters", p);
        this.$store.commit("game/setBusyStatus", false);
      });

      room.onMessage("sent-message", (payload) => {
        this.$vs.notification({
          border: "rgb(59,222,200)",
          color: "#2b2b2b",
          duration: 5000,
          width: "auto",
          title: `${payload.username} said:`,
          text: payload.msg,
          classNotification: "ingame-message",
        });
      });
      room.onLeave(() => {
        if (!this.notBroken)
          this.alertSystem({
            msg: "You've been disconnected! Quick, reload the page! D:",
            status: "warning",
          });
      });
    }

    this.tick = setInterval(() => {
      this.timer = this.timer - 1.66;
      this.count = this.count - 1;
      if (this.timer === 0) {
        clearInterval(this.tick);
      }
    }, 1000);
  },

  mounted() {
    if (this.GetMyData.isTurn)
      this.$store.commit("midori/setUpdate", {
        value: true,
        index: 0,
      });
    else
      this.$store.commit("midori/setUpdate", {
        value: true,
        index: 1,
      });

    this.selectUserView(this.myEnemyData);
  },

  beforeDestroy() {
    this.$store.commit("game/resetState");
    this.$eventBus.$off();
  },
};
</script>

<style lang="scss">
@import "./style";
</style>