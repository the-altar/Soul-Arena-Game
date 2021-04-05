<template>
  <main class="character">
    <div class="character-panel">
      <transition name="slide-fade">
        <figure class="character__figure" v-if="id" :key="id">
          <img class="character__banner" :src="`/uploads/${banner}.jpg`" />
        </figure>
      </transition>

      <transition name="fade">
        <slot></slot>
      </transition>
    </div>
  </main>
</template>

<script>
import components from "./script/components";
import computed from "./script/computed";
import methods from "./script/methods";
import watchers from "./script/watchers";

export default {
  props: ["id", "banner"],
  components,
  computed,
  methods,
  watchers,
};
</script>

<style lang="scss" scoped>
@import "./style";
</style>