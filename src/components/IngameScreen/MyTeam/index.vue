<template>
  <div class="myteam">
    <section
      v-for="(char, index) in myTeam"
      :key="index"
      :class="{ none: char === false }"
    >
      <div class="myteam-char" v-if="char !== false">
        <CharFace :char="char" :index="index" />

        <section class="myteam-gamestatus">
          <SkillQueue :index="index" />
          <Skills
            :skills="char.skills"
            :charIndex="index"
            @selected-skill="setSkill"
          />
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import components from "./script/components";
import computed from "./script/computed";
import methods from "./script/methods";
import watchers from "./script/watchers";

export default {
  data() {
    return {
      selectedSkill: {},
    };
  },
  components,
  computed,
  methods,
  watchers,
  created() {
    this.$eventBus.$on("set-target", (target) => {
      const room = this.$store.getters["game/getBattleRoom"];
      room.send("add-skill-to-queue", {
        ...this.selectedSkill,
        target: target,
      });
      this.$store.commit("game/setBusyStatus", true);
    });
  },
};
</script>

<style lang="scss">
@import "~@/assets/css/mixin.scss";
@import "./style";
</style>