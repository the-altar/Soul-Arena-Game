<template>
  <div class="viewer" :class="`${theme}-view`">
    <Skill v-if="isSkill" :data="data"></Skill>
    <Char v-if="isChar" :char="data" />
    <User v-if="isUser" :data="data" />
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
      isSkill: false,
      isChar: false,
      isUser: false,
      data: {
        skillpic: "",
        description: "",
      },
    };
  },
  components,
  computed,
  methods,
  watchers,
  created() {
    //EVENT RECEIVED FROM:
    //EVENT RECEIVED FROM: src/components/IngameScreen/Viewer/char.module.vue
    this.$eventBus.$on("selected-a-skill", (skill) => {
      this.isChar = false;
      this.isUser = false;
      this.isSkill = true;
      this.data = skill;
    });

    // EVENT RECEIVED FROM src/views/IngameScreen/index.vue
    this.$eventBus.$on("selected-an-user", (user) => {
      this.isChar = false;
      this.isSkill = false;
      this.isUser = true;
      this.data = user;
    });

    // EVENT RECEIVED FROM src/components/IngameScreen/MyTeam/charface.module.vue
    this.$eventBus.$on("selected-a-char", (char) => {
      this.isUser = false;
      this.isSkill = false;
      this.isChar = true;
      this.data = char;
    });
  },
};
</script>

<style lang="scss">
@import "./style";
</style>