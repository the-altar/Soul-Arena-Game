<template>
  <section class="skill">
    <div class="skill__name">
      <p>{{ data.name }}</p>

      <div class="skill__energies">
        <p class="skill__cost">cost:</p>
        <span
          v-for="(energy, key) in energyCost"
          :class="`skill__energy ${energy}`"
          :key="key"
        ></span>
      </div>
    </div>

    <p class="skill__description">{{ data.description }}</p>

    <div class="skill__params">
      <p class="skill__params__cooldown">
        Classes:
        <span :class="`${skillType[data.class]}--text`">{{ skillType[data.class] }}</span>
        ,
        {{ control[data.persistence] }}
      </p>
      <p class="skill__params__class">Cooldown: {{ data.baseCooldown }}</p>
    </div>
  </section>
</template>


<script>
export default {
  props: ["data"],
  methods: {},
  computed: {
    energyCost() {
      const energies = ["Hakuda", "Kidou", "Reiryoku", "Zanpakutou", "Random"];
      let cost = [];
      for (let i = 0; i < energies.length; i++) {
        for (let key = 0; key < this.data.cost[i]; key++) {
          cost.push(energies[i]);
        }
      }
      return cost;
    },
    skillType() {
      return this.$store.getters["enums/getEnum"]("skillClassTypings");
    },
    types() {
      return this.$store.getters["enums/getEnum"]("pokemonTypings");
    },
    control() {
      return this.$store.getters["enums/getEnum"]("controlTypings");
    },
  },
  watchers: {},
};
</script>

<style lang="scss">
.skill {
  width: 100%;
  height: 70%;

  &__params {
    display: flex;
    color: #aaaeb5;
    height: 15%;
    width: 90%;
    font-size: 10px;
    &__cooldown {
      margin: 0 auto 0 0;
    }

    &__class {
      margin: 0 0 0 auto;
    }
  }

  &__name {
    width: 90%;
    font-size: 14px;
    padding-bottom: 4px;
    max-height: 25px;
    margin-top: 10px;
    color: white;
    font-weight: bold;
    box-sizing: border-box;
    border-bottom: 1px solid rgba($color: white, $alpha: 0.2);
    display: flex;
    align-items: center;
    p {
      margin: 0;
    }
  }

  &__energies {
    height: 20px;
    width: 100px;
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  &__energy {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-left: 6px;
  }

  &__description {
    width: 98%;
    height: 65%;
    overflow: auto;
    font-size: 12px;
    margin: 5px 0 0 0;
    font-family: "Open Sans", sans-serif;
    color: white;
  }

  &__cost {
    font-size: 10px;
  }
}
</style>