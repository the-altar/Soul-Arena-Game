<template>
  <main
    v-if="userData"
    class="container fade-in-bck"
    :class="{ bg: isDisabled }"
  >
    <div class="home__panel">
      <div class="home-roster">
        <drop
          class="home-roster-pic"
          :class="`${theme}-default`"
          v-for="(char, key) in currentTeam.members"
          @drop="handleDrop(key, ...arguments)"
          :key="key"
          :draggable="false"
        >
          <img
            @dblclick="removeCharByIndex(key)"
            v-if="char.facepic"
            :src="`/uploads/${char.facepic}.jpg`"
          />
          <img v-else src="~@/assets/img/icons/interrogation.png" />
        </drop>
      </div>

      <button @click="joinMatchMake('rankedLobby')" class="home__btn">
        <div :class="`${theme}-fancy flex`" v-if="!searchingRankedGame">
          Ranked Match
        </div>
        <div :class="`${theme}-fancy`" v-else>
          <p>Searching...</p>
          <p class="home__btn--small">{{ clients }} players in queue</p>
        </div>
        <span :class="`${theme}-fancy`">
          <img
            :class="{ 'home__btn-active': searchingRankedGame }"
            :src="`themes/${this.theme}/sa.png`"
          />
        </span>
      </button>

      <button @click="joinMatchMake('quickLobby')" class="home__btn">
        <div :class="`${theme}-fancy flex`" v-if="!searchingQuickGame">
          Quick Match
        </div>
        <div :class="`${theme}-fancy`" v-else>
          <p>Searching...</p>
          <p class="home__btn--small">{{ clients }} players in queue</p>
        </div>
        <span :class="`${theme}-fancy`">
          <img
            :class="{ 'home__btn-active': searchingQuickGame }"
            :src="`themes/${this.theme}/sa.png`"
          />
        </span>
      </button>

      <button
        v-if="userData.rank.authLevel >= 0"
        @click="$router.push({ name: 'assignments' })"
        class="home__btn"
      >
        <div :class="`${theme}-fancy flex`">Assignments</div>
        <span :class="`${theme}-fancy`">
          <img :src="`themes/${this.theme}/sa.png`" />
        </span>
      </button>

      <div>
        <button
          class="home-icon"
          :class="`${theme}-fancy`"
          @click="openPlayerModal()"
        >
          <img src="~@/assets/img/icons/user.svg" />
        </button>
        <button
          class="home-icon"
          :class="`${theme}-fancy`"
          @click="$router.push({ name: 'themes' })"
        >
          <img src="~@/assets/img/icons/theme.svg" />
        </button>
      </div>
    </div>

    <router-view class="home__router"></router-view>
  </main>
</template>

<script>
import components from "./script/components";
import computed from "./script/computed";
import methods from "./script/methods";
import watchers from "./script/watchers";

export default {
  data() {
    return {
      searchingGame: false,
      searchingQuickGame: false,
      searchingRankedGame: false,
      btn2: false,
      gameRoom: null,
      clients: 0,
    };
  },
  components,
  computed,
  methods,
  watchers,
  async created() {
    const u = await this.$http.get("/user");
    this.$store.commit("user/SET_USER", u.data);
  },
  mounted() {
    this.$store.commit("midori/setUpdate", {
      value: true,
      index: 2,
    });
  },
  beforeDestroy() {
    if (this.gameRoom) {
      this.gameRoom.leave();
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/css/mixin.scss";
@import "./style";
</style>