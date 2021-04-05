<template>
  <main id="app">
    <canvas v-if="!isDisabled" class="canvas" ref="canvas"></canvas>

    <transition name="fade">
      <router-view
        v-if="imagesReady && loaded"
        v-show="isLoaded || isDisabled"
      />
      <div class="app-loading" v-else>
        <img class="app-loading-gif" src="~@/assets/img/icons/wait.gif" />
        <div class="app-opt">
          <p class="app-opt-checkbox">
            <input type="checkbox" v-model="disableMidori" />
            Disable animated background
          </p>
          <p class="app-opt-help">
            This feature uses WebGL and might affect performance. Check here to
            opt-out of it.
          </p>
        </div>
        <p class="app-loading-text">{{ message }}</p>
      </div>
    </transition>
    <v-dialog />
    <playerPanel
      v-if="profileModal"
      @close="$store.getters['user/modalStates'].profile = false"
    />
    <transition enter-active-class="slideInUp" leave-active-class="slideOutDown"
      >>
      <notification v-if="activeModal === 0"></notification>
    </transition>
  </main>
</template>

<script>
import axios from "axios";
import playerPanel from "@/components/Modals/playerpanel";
import notification from "@/components/Modals/notification";
export default {
  components: {
    playerPanel,
    notification,
  },
  data() {
    return {
      imagesReady: false,
      loaded: false,
      disableMidori: false,
      message: "Gaming is loading...",
    };
  },
  methods: {
    async reconnectToGame() {
      let battle = localStorage.getItem("battle");
      if (!battle) {
        setTimeout(() => {
          this.$store.dispatch("audio/playGameStart");
          this.loaded = true;
          this.$router.push({ name: "home" });
        }, 3000);
        return;
      }
      battle = JSON.parse(battle);
      this.message = "You're currently in a match; attempting to reconnect!";
      try {
        const room = await this.$colyseus.reconnect(
          battle.roomId,
          battle.sessionId
        );
        this.$store.commit("game/setRoom", room);
        setTimeout(() => {
          this.$store.dispatch("audio/playGameStart");
          this.loaded = true;
          this.$router.push({ name: "ingame" });
        }, 3000);
      } catch (e) {
        localStorage.removeItem("battle");
        this.$router.push({ name: "home" });
        this.loaded = true;
      }
    },
  },
  computed: {
    isLoaded() {
      return this.$store.state.midori.isLoaded;
    },
    isDisabled() {
      return this.$store.state.midori.disabled;
    },
    update() {
      return this.$store.state.midori.update;
    },
    profileModal() {
      return this.$store.getters["user/modalStates"].profile;
    },
  },
  async mounted() {
    try {
      this.message = "Retrieving user data...";
      const user = await this.$http.get("/user");
      this.message = "Collecting roster...";
      const res = await axios.get("/character");
      this.message = "Just a few things left...";
      const enums = await axios.get("/game-enums");

      this.$store.commit("SET_THEME", user.data.theme);
      this.$store.commit("user/SET_USER", user.data);
      this.$store.commit("audio/setAudio");
      this.$store.commit("Roster/setData", res.data);
      this.$store.commit("enums/setEnums", enums.data);
      this.$colyseus
        .joinOrCreate("lobby", { auth: user.data.auth, id: user.data.id })
        .then((room) => {
          this.$store.commit("lobby/SET_ROOM", room);
        })
        .catch(() => {
          this.$store.commit("lobby/SET_ROOM", null);
        });

      this.reconnectToGame();
      this.$store
        .dispatch("midori/setCanvas", {
          canvas: this.$refs.canvas,
          theme: this.theme,
        })
        .then((r) => {
          this.imagesReady = r;
        });
    } catch (err) {
      this.$router.push({ name: "login" });
    }
  },
  // The Midori background has to be set by the root element so I watch for changes here
  watch: {
    update(n) {
      if (n) {
        if (this.$store.state.midori.index === 2) {
          this.$store.commit("midori/setHomeBackground");
        } else {
          this.$store.commit("midori/setTurnBackground");
        }
      }
      this.$store.state.midori.update = false;
    },
    disableMidori(n) {
      if (!n) this.$store.commit("midori/enable");
      else this.$store.commit("midori/disable");
    },
  },
  beforeDestroy() {
    this.$store.commit("midori/cleanUp");
  },
};
</script>

