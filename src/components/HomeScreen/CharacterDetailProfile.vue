<template>
  <section class="profile">
    <div class="profile__name">
      <p>{{ data.name }}</p>
      <div class="profile__energies">
        <span
          v-for="(index, key) in data.energyGain"
          :class="`profile__energy ${energies[index]}`"
          :key="key"
        ></span>
      </div>
    </div>
    <p class="profile__description">{{ data.description }}</p>
    <p class="profile__typing">
      Affiliation:
      <span
        v-for="(type, key) in data.type"
        :key="key"
        class="profile__typing__type"
        >{{ types[type] }}<span v-if="key + 1 < data.type.length">,</span></span
      >
    </p>
  </section>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      energies: ["Hakuda", "Kidou", "Reiryoku", "Zanpakutou", "Random"],
    };
  },
  methods: {},
  computed: {
    types() {
      return this.$store.getters["enums/getEnum"]("characterTypings");
    },
  },
  watchers: {},
};
</script>


<style lang="scss">
.profile {
  width: 100%;
  height: 70%;

  &__name {
    width: 90%;
    font-size: 14px;
    padding-bottom: 4px;
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
    text-align: right;
  }

  &__energy {
    width: 10px;
    height: 10px;
    border-radius: 100%;
    display: inline-block;
    margin-left: 6px;
  }

  &__description {
    width: 90%;
    height: 60%;
    overflow: auto;
    font-size: 12px;
    font-family: "Open Sans", sans-serif;
    margin: 5px 0 0 0;
    color: white;
    overflow: hidden;
  }

  &__typing {
    margin: 0;
    font-size: 11px;
    color: #7eabf8;

    &__type {
      margin-right: 5px;
      color: #aaaeb5;
    }
  }
}
</style>