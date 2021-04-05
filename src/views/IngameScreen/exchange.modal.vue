<template>
  <div class="modal" @click.self="close()">
    <div class="content fade-in-fwd">
      <h1 class="header">Reiatsu exchange</h1>

      <div class="step" v-if="!isPaid">
        <p class="step__head">Select a new reiatsu</p>
        <div>
          <li
            :class="[
              `step__energy`,
              energy,
              { selected: exchangeIndex === key },
            ]"
            @click="askExchange(key)"
            v-for="(energy, key) in energies"
            :key="key"
          ></li>
        </div>
      </div>

      <div class="step" v-if="debt > 0 && isPaid === false">
        <p class="step__head step__head--larger">
          Now exchange {{ debt }} reiatsu to proceed
        </p>

        <div>
          <li
            :class="`step__energy ${energies[key]}`"
            @click="payExchange(key)"
            v-for="(energy, key) in original.slice(0, 4)"
            :key="key"
            v-tooltip="{
              content: `You have ${original[key]} ${reiatsuTypes[key]} reiatsu`,
              classes: ['small'],
              placement: 'bottom',
            }"
          ></li>
        </div>
      </div>

      <div class="step" v-if="isPaid">
        <p class="step__header">
          You're about to exchange 2
          <span :class="`${energies[paidIndex]}-text`">{{
            energies[paidIndex]
          }}</span>
          reiatsu for 1
          <span :class="`${energies[exchangeIndex]}-text`">{{
            energies[exchangeIndex]
          }}</span>
          reiatsu.
        </p>
        <div>
          <button @click="confirmExchange">Confirm</button>
          <button @click="close()">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      energies: ["Hakuda", "Kidou", "Reiryoku", "Zanpakutou"],
      exchange: [0, 0, 0, 0],
      original: [],
      debt: 0,
      paidIndex: 0,
      exchangeIndex: 0,
      isPaid: false,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    askExchange(key) {
      this.debt = 2;
      this.exchangeIndex = key;
      this.isPaid = false;
      this.exchange.splice(key, 1, this.exchange[key] + 1);
    },
    payExchange(index) {
      if (this.original[index] < 2) return;
      this.paidIndex = index;
      this.original.splice(index, 1, (this.original[index] -= 2));
      this.original.splice(
        this.exchangeIndex,
        1,
        this.original[this.exchangeIndex] + 1
      );
      this.original[4] = this.original.slice(0, 4).reduce((ca, cv) => ca + cv);
      this.isPaid = true;
    },
    confirmExchange() {
      if (this.$store.getters["game/isBusy"]) return;
      this.$store.commit("game/setBusyStatus", true);
      const room = this.$store.getters["game/getBattleRoom"];
      room.send("exchange-energypool", this.original);
      this.close();
    },
  },
  computed: {
    energyPool() {
      return this.original;
    },
    reiatsuTypes() {
      return this.$store.getters["enums/getEnum"]("reiatsuTypings");
    },
  },
  created() {
    const myId = this.$store.getters["user/getUserData"].id;
    this.original = this.$store.getters["game/GetMyData"](
      myId
    ).energyPool.slice();
  },
};
</script>

<style lang="scss" scoped>
$energies: (
  Hakuda: #727272,
  Kidou: #027add,
  Reiryoku: #fdc200f8,
  Zanpakutou: #c91a03,
  Random: #141414,
);

@each $energy, $hexColor in $energies {
  .#{$energy} {
    background-color: $hexColor;
  }

  .#{$energy}-glow {
    box-shadow: 0 0 1px 1px $hexColor;
  }
  .#{$energy}-text {
    color: $hexColor;
    font-weight: bolder;
  }
}

.modal {
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.content {
  width: 300px;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 2px 2px rgba($color: #000000, $alpha: 0.5);
}

.header {
  margin: 5px;
  font-size: 14px;
}

.step {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #2b2b2b !important;
  padding: 10px;
  &__head {
    margin: 5px;
    font-size: 12px;
    width: 200px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border-radius: 20px;
    &--larger {
      width: 230px;
    }
  }
  &__energy {
    width: 11px;
    height: 11px;
    margin: 5px;
    display: inline-block;
    border-radius: 100%;
    box-shadow: 1px 1px 4px 1px rgba($color: #000000, $alpha: 0.3);
    border: 2px solid white;
    position: relative;
  }

  &__header {
    font-size: 12px;
  }
}

.selected {
  border: 2px solid #2b2b2b;
}

.fade-in-fwd {
  -webkit-animation: fade-in-fwd 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  animation: fade-in-fwd 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}

@-webkit-keyframes fade-in-fwd {
  0% {
    -webkit-transform: translateZ(-80px);
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
@keyframes fade-in-fwd {
  0% {
    -webkit-transform: translateZ(-80px);
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    opacity: 1;
  }
}
</style>