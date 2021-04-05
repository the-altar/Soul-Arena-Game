<template>
  <div class="charface" :class="{ reversed: reversed }">
    <img
      v-if="pulsate"
      class="pulsate-once"
      :src="`/uploads/${facepic}.jpg`"
    />
    <img v-if="isTarget" class="pulsate" :src="`/uploads/${facepic}.jpg`" />
    <img :src="`/uploads/${facepic}.jpg`" :class="{ fainted: ko }" />
  </div>
</template>

<script>
export default {
  props: ["facepic", "ko", "isTarget", "reverse", "index"],
  data() {
    return { pulsate: false };
  },
  computed: {
    reversed() {
      return this.reverse;
    },
  },
  created() {
    this.$eventBus.$on(`healthLost-${this.index}`, () => {
      this.pulsate = true;
      setTimeout(() => {
        this.pulsate = false;
      }, 1000);
    });
  },
};
</script>

<style lang='scss'>
.charface {
  width: 75px;
  height: 75px;
  position: relative;

  img {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
}
.reversed {
  transform: scaleX(-1);
}
</style>