<template>
  <div class="roster">
    <div class="roster-list">
      <drag
        class="roster__icon"
        :class="`${theme}-shard`"
        v-for="(char, key) in roster"
        :key="key"
        :transfer-data="char"
      >
        <img
          v-if="unlocked.includes(char.id) || char.isFree || userRank >= 100"
          @click="selectCharacterMethod(char, true)"
          @dblclick="emitAddToTeam(char)"
          :src="`/uploads/${char.facepic}.jpg`"
        />
        <img
          v-else
          @click="selectCharacterMethod(char, false)"
          class="roster-faded"
          :src="`/uploads/${char.facepic}.jpg`"
        />
      </drag>
      <div
        class="roster__icon roster-empty roster-faded"
        :class="`${theme}-shard`"
        v-for="x in emptySpace"
        :key="x"
      ></div>
    </div>

    <div class="roster-footer">
      <img
        class="roster-list-next roster-list-next-reverse"
        :src="`/themes/${theme}/next.svg`"
      />
      <span
        v-for="x in Math.ceil(roster.length / 24)"
        :key="x"
        class="roster-points"
        :class="`${theme}-glow`"
      ></span>
      <img class="roster-list-next" :src="`/themes/${theme}/next.svg`" />
    </div>
  </div>
</template>

<script>
import components from "./script/components";
import methods from "./script/methods";

export default {
  data() {
    return {
      start: 0,
      end: 32,
    };
  },
  computed: {
    roster() {
      return this.$store.state.Roster.data.slice(0, 24);
    },
    isLoaded() {
      return this.$store.state.Roster.isLoaded;
    },
    unlocked() {
      return this.$store.getters["user/getUserData"].unlocked;
    },
    userRank() {
      return this.$store.getters["user/getUserData"].rank.authLevel;
    },
    emptySpace() {
      return 24 - this.roster.length;
    },
  },
  components,
  methods,
  created() {
    this.selectCharacterMethod(this.roster[0]);
  },
};
</script>

<style lang="scss">
@import "@/assets/css/mixin.scss";
@import "./style";
</style>