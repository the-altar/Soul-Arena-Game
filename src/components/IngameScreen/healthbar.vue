<template>
  <div class="hp">
    <div class="hp-value">{{ hp }}</div>
    <div class="hp-gauge" :style="`width: ${hp}%`"></div>
  </div>
</template>

<script>
export default {
  props: ["hp", "index"],
  watch: {
    hp: function () {
      this.$eventBus.$emit(`healthLost-${this.index}`);
    },
  },
};
</script>

<style lang="scss">
.hp {
  line-height: 12.5px;
  font-size: 12px;
  width: 75px;
  height: 12.5px;
  background-color: crimson;
  position: relative;
  overflow: hidden;
  margin-top: 5px;
  box-shadow: 1px 1px 2px 2px rgba($color: #000000, $alpha: 0.2);

  &-value {
    position: absolute;
    z-index: 1;
    text-align: center;
    width: 100%;
  }

  &-gauge {
    background-color: rgb(0, 192, 32);
    max-width: 100%;
    height: 100%;
    position: relative;
    z-index: 0;
    transition: width 1s;
  }
}
</style>