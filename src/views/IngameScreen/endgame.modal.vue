<template>
  <div class="modal puff-in-center">
    <div v-if="winner" class="content">
      <img :src="winnerPic" />
      <p class="head">You've won!</p>
      <div class="results">
        <p>+{{ winningRes.exp }} exp</p>
        <p>+{{ winningRes.coins }} coins</p>
        <p>+1 streak</p>
      </div>
      <button @click="$router.push({ name: 'home' })" class="btn">
        Continue
      </button>
    </div>

    <div v-else class="content">
      <img :src="loserPic" />
      <p class="head">You've lost...</p>
      <div class="results">
        <p>-{{ losingRes.exp }} exp</p>
        <p class="middle">+{{ losingRes.coins }} coins</p>
        <p>-{{ 1 }} streak</p>
      </div>

      <button @click="$router.push({ name: 'home' })" class="btn">
        Continue
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      loserPic: require("@/assets/img/loser.png"),
      winnerPic: require("@/assets/img/winner.png"),
    };
  },
  computed: {
    myId() {
      return this.$store.getters["user/getUserData"].id;
    },
    winner() {
      return this.data.winner.playerData.id === this.myId;
    },
    winningRes() {
      return this.data.winner.results;
    },
    losingRes() {
      return this.data.loser.results;
    },
  },
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
  font-size: 14px;
}

.modal {
  height: 100%;
  width: 100%;
  position: absolute;
  background-color: rgba($color: #000000, $alpha: 0.5);
  z-index: 3;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.content {
  width: 350px;
  height: 300px;
  overflow: hidden;
  display: flex;
  color: rgb(214, 214, 214);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: url("~@/assets/img/watercolor-brush.png");
  background-size: contain;
  background-blend-mode: multiply;
  background-repeat: no-repeat;
  background-position: center;
  img {
    width: 350px;
    padding: 5px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-sizing: border-box;
  }
}

.head {
  width: 200px;
  height: 100px;
  display: flex;
  font-size: 14px;
  background-color: #2b2b2b;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}

.results {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  p {
    text-shadow: 0px 0px 3px #fafafa;
    font-size: 12px;
    font-family: "Open Sans", sans-serif;
  }
}

.middle {
  box-shadow: -5px 0 5px -5px rgba($color: #000000, $alpha: 0.5),
    5px 0 5px -5px rgba($color: #000000, $alpha: 0.5);
}

.btn {
  width: 120px;
  height: 100px;
  border-radius: 10px;
  background-color: #2b2b2b;
  color: #fafafa;
  cursor: pointer;
}

.puff-in-center {
  -webkit-animation: puff-in-center 0.5s cubic-bezier(0.47, 0, 0.745, 0.715)
    both;
  animation: puff-in-center 0.5s cubic-bezier(0.47, 0, 0.745, 0.715) both;
}

@-webkit-keyframes puff-in-center {
  0% {
    -webkit-transform: scale(2);
    transform: scale(2);
    -webkit-filter: blur(4px);
    filter: blur(4px);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
@keyframes puff-in-center {
  0% {
    -webkit-transform: scale(2);
    transform: scale(2);
    -webkit-filter: blur(4px);
    filter: blur(4px);
    opacity: 0;
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-filter: blur(0px);
    filter: blur(0px);
    opacity: 1;
  }
}
</style>