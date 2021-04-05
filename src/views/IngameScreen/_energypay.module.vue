<template>
  <div class="cart" @click.self="close">
    <section class="cart-cart">
      <p class="cart-head">Pay {{ queue[4] }} reiatsu to proceed</p>

      <div
        class="cart-opt"
        v-for="(energy, key) in energyPool.slice(0, 4)"
        :key="key"
      >
        <div class="cart-field">
          <p class="cart-energy">{{ energyName[key] }}</p>
          <p>{{ energy }}</p>
          <button @click="pay(key)">+</button>
        </div>
        <div class="cart-field">
          <button @click="refund(key)">-</button>
          <p>{{ paid[key] }}</p>
        </div>
      </div>

      <div class="cart-skills">
        <img
          v-for="(cordinate, key) in tempQueue"
          :key="key"
          :src="`/uploads/${
            skill(cordinate.caster, cordinate.skill).skillpic
          }.jpg`"
        />
      </div>

      <button class="btn" @click="endturn">Proceed</button>
    </section>
  </div>
</template>

<script>
export default {
  props: ["queue"],
  data() {
    return {
      sum: 0,
      paid: [0, 0, 0, 0],
      energyName: ["Hakuda", "Kidou", "Reiryoku", "Zanpakutou", "Random"],
    };
  },
  methods: {
    close() {
      for (const index in this.paid) {
        this.energyPool.splice(
          index,
          1,
          this.energyPool[index] + this.paid[index]
        );
      }
      this.$emit("close");
    },
    pay(index) {
      if (this.queue[4] === this.sum) return;
      if (this.energyPool[index] <= 0) return;
      this.energyPool.splice(index, 1, this.energyPool[index] - 1);
      this.paid.splice(index, 1, this.paid[index] + 1);
      this.sum++;
    },
    refund(index) {
      if (this.queue[4] === 0) return;
      if (this.paid[index] <= 0) return;
      this.energyPool.splice(index, 1, this.energyPool[index] + 1);
      this.paid.splice(index, 1, this.paid[index] - 1);
      this.sum--;
    },
    endturn() {
      if (
        this.$store.getters["game/isBusy"] ||
        this.$store.getters["game/turnStatus"]
      )
        return;

      const payment = this.paid.reduce((a, b) => a + b, 0);
      if (payment != this.queue[4]) return;


      this.$store.commit("game/setTurnStatus", true);
      this.$store.commit("game/setBusyStatus", true);

      const room = this.$store.getters["game/getBattleRoom"];
      room.send("end-game-turn", this.paid);
    },
  },
  computed: {
    tempQueue() {
      return this.$store.getters["game/getTempQueue"];
    },
    skill() {
      return this.$store.getters["game/getSkillByCaster"];
    },
    energyPool() {
      const myId = this.$store.getters["user/getUserData"].id;
      return this.$store.getters["game/GetMyData"](myId).energyPool;
    },
  },
};
</script>

<style lang="scss" scoped>
.cart {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: #000000, $alpha: 0.7);

  &-cart {
    width: 400px;
    height: 275px;
    border-radius: 20px;
    background-color: #363636;
    color: #dadada;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 2px 2px 5px 5px rgba($color: #000000, $alpha: 0.4);
  }

  &-opt {
    width: 50%;
    justify-content: space-evenly;
    display: flex;
    color: #2b2b2b;
  }

  &-head {
    line-height: 20px;
    height: 20px;
    width: 225px;
    text-align: center;
    background-color: #2b2b2b;
    color: #fafafa;
    font-size: 12px;
    margin: 0;
    margin-bottom: 5px;
  }

  &-field {
    display: flex;
    button {
      width: 25px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      margin: 2px;
      background-color: crimson;
      color: white;
    }

    p {
      width: 30px;
      text-align: center;
      line-height: 25px;
      background-color: rgba($color: #fafafa, $alpha: 0.5);
      height: 25px;
      box-shadow: 1px 2px 2px 2px rgba($color: #000000, $alpha: 0.2);
      margin: 0;
      margin: 2px;
    }
  }

  &-skills {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    width: 80%;
    margin: 4px;

    img {
      border-radius: 5px;
      width: 40px;
      box-shadow: 2px 2px 2px 2px rgba($color: #000000, $alpha: 0.2);
      margin: 5px;
    }
  }

  &-energy {
    width: 100px !important;
    font-size: 12px;
  }
}

.btn {
  color: #fafafa;
  width: 200px;
  height: 25px;
  background-color: #2b2b2b;
  cursor: pointer;
}
</style>