<template>
  <router-view />
</template>

<script>
export default {
  created() {
    this.$store.commit("SET_THEME", "midnight");
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
