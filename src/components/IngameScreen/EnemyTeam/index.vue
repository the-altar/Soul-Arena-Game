<template>
  <div class='enemy'>
    <CharFace v-for='(char, key) in enemyTeam' :key='key' :char='char' :index='key'></CharFace>
  </div>
</template>

<script>
import components from "./script/components";
import computed from "./script/computed";
import methods from "./script/methods";
import watchers from "./script/watchers";

export default {
  data() {
    return {};
  },
  components,
  computed,
  methods,
  watchers
};
</script>

<style lang="scss">
@import "./style";
</style>