<template>
  <section class="skill">
    <img class="skill-img" :src="`/uploads/${data.banner}.jpg`" />
    <div class="skill-info">
      <div class="skill-info-small">
        <p class="skill-name">{{ data.name }}</p>
        <p class="skill-cost">
          Cost:
          <span
            v-for="(c, k) in costs"
            :key="k"
            :class="`viewer-energy ${c}`"
          ></span>
        </p>
      </div>
      <div class="skill-info-large">
        {{ data.description }}
      </div>
      <div class="skill-info-small">
        <p class="skill-classes">
          Classes: {{ classes[data.class] }}, {{ control[data.persistence] }}
        </p>
        <p class="skill-cooldown">Cooldown: {{ data.baseCooldown }}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: ["data"],
  computed: {
    costs() {
      const energies = ["Hakuda", "Kidou", "Reiryoku", "Zanpakutou", "Random"];
      let cost = [];
      for (let i = 0; i < energies.length; i++) {
        for (let key = 0; key < this.data.turnCost[i]; key++) {
          cost.push(energies[i]);
        }
      }
      return cost;
    },
    control() {
      return this.$store.getters["enums/getEnum"]("controlTypings");
    },
    classes() {
      return this.$store.getters["enums/getEnum"]("skillClassTypings");
    },
  },
};
</script>


<style lang="scss" scoped>
.skill {
  width: 100%;
  height: 90%;
  display: flex;
  justify-content: left;
  align-items: center;
  position: absolute;
  z-index: 2;

  &-info {
    width: 72%;
    height: 100%;

    &-small {
      width: 100%;
      height: 20%;
      display: flex;
    }

    &-large {
      font-family: "Open Sans", sans-serif;
      font-size: 12px;
      padding-left: 5px;
      width: 100%;
      height: 60%;
      box-sizing: border-box;
    }
  }

  &-name {
    font-size: 13px;
    font-weight: bold;
    padding-left: 5px;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    height: 100%;
    width: 50%;
    margin: 0;
  }

  &-cost {
    font-size: 10px;
    display: inline-flex;
    align-items: center;
    box-sizing: border-box;
    margin: 0;
    font-family: "Open Sans", sans-serif;
    margin-left: auto;
    width: 100px;
    height: 100%;
    padding-left: 5px;
  }

  &-classes {
    box-sizing: border-box;
    padding-left: 5px;
    display: inline-flex;
    align-items: center;
    width: 45%;
    height: 100%;
    font-family: "Open Sans", sans-serif;
    font-size: 10px;
    margin: 0;

    span {
      margin-left: 5px;
    }
  }

  &-cooldown {
    margin: 0;
    margin-left: auto;
    padding-right: 30px;
    font-family: "Open Sans", sans-serif;
    width: 33%;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    font-size: 10px;
  }

  &-img {
    height: 100px;
    box-sizing: border-box;
    border: 1px solid black;
    margin-right: 5px;
  }
}
</style>