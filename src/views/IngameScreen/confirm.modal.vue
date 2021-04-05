<template>
  <div class="modal">
    <div class="content fade-in-fwd">
      <h1 class="header">Are you sure?</h1>
      <div class="options">
        <button @click="confirm" class="separator">Yes</button>
        <button @click="close">No</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      if (this.$store.getters["game/isBusy"]) return;
      this.$store.commit("game/setBusyStatus", true);

      const room = this.$store.getters["game/getBattleRoom"];
      room.send("surrender", this.$store.getters["user/getUserData"].id);
    },
  },
};
</script>

<style lang="scss" scoped>
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
  height: 125px;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 2px 2px rgba($color: #000000, $alpha: 0.5);
}

.header {
  margin: 0;
  height: 75px;
  width: 100%;
  text-align: center;
  line-height: 75px;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
  color: #2b2b2b;
  font-weight: normal;
  font-size: 21px;
}

.options {
  height: 75%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  button {
    width: 50%;
    height: 100%;
    cursor: pointer;
    &:hover {
      background-color: crimson;
      color: #fafafa;
    }
  }
}

.separator {
  border-right: 1px solid rgba($color: #000000, $alpha: 0.1);
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