<template>
  <div class="char">
    <div class="char-avatar">
      <img :src="`/uploads/${char.banner}.jpg`" />
    </div>
    <div class="char-profile">
      <div class="narrow">
        <p class="char-name">{{ char.name }}</p>
        <p class="char-gain">
          <span
            v-for="(cost, key) in char.energyGain"
            :key="key"
            :class="`char-cost ${energy[cost].toLowerCase()}`"
          ></span>
        </p>
      </div>
      <div class="wide">
        <p>{{ char.description }}</p>
      </div>
      <div class="normal">
        <div class="char-skill" v-for="(skill, k) in char.skills" :key="k">
          <img
            :src="`/uploads/${skill.skillpic}.jpg`"
            @click="displaySkill(skill)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["char"],
  computed: {
    energy() {
      return this.$store.getters["enums/getEnum"]("costTypings");
    },
  },
  methods: {
    displaySkill(skill) {
      this.$eventBus.$emit("selected-a-skill", skill);
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}

.char {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  &-avatar {
    width: 100px;
    height: 100px;
    box-sizing: border-box;
    margin-right: 5px;
    img {
      border: 1px solid black;
      width: 100px;
    }
  }

  &-profile {
    width: 435px;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &-name {
    height: 100%;
    width: 70%;
  }

  &-gain {
    height: 100%;
    width: 30%;
    display: flex;
    align-items: center;
  }

  &-cost {
    width: 11px;
    height: 11px;
    border-radius: 100%;
    margin-right: 5px;
  }

  &-skill {
    img {
      height: 25px;
      margin: 2px;
      border-radius: 100%;
      box-sizing: border-box;
    }
  }
}

.narrow {
  width: 100%;
  height: 15%;
  display: flex;
  font-size: 14px;
  font-weight: bold;
  margin-top: 2px;
  margin-bottom: 2px;
  padding-left: 5px;
}

.wide {
  width: 98%;
  height: 60%;
  display: flex;
  font-size: 12px;
  padding-left: 5px;
  padding-right: 5px;
}

.normal {
  width: 100%;
  height: 26%;
  display: flex;
  margin-bottom: 2px;
  padding-left: 5px;
  div {
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>