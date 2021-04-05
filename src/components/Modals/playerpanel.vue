<template>
  <div class="modal fade-in-fwd" @click.self="$emit('close')">
    <div class="user" v-if="user">
      <div class="user-header">
        <img :src="`/img/avatars/${user.avatar}`" />
        <p>
          {{ user.username }} <br />
          <span class="user-header-rank">{{ user.season.seasonRank }}</span
          ><br />
        </p>

        <button class="user-reset-btn" @click="resetStats">Reset</button>
      </div>

      <div>
        <div class="user-stats">
          <div class="user-stats-detail">
            <p>{{ user.season.wins }}</p>
            <p class="user-stats-label">Wins</p>
          </div>
          <div class="user-stats-detail">
            <p>{{ user.season.losses }}</p>
            <p class="user-stats-label">Losses</p>
          </div>
          <div class="user-stats-detail">
            <p>{{ user.season.streak }}</p>
            <p class="user-stats-label">Streak</p>
          </div>
        </div>

        <div class="user-stats">
          <div class="user-stats-detail">
            <p>{{ user.season.maxStreak }}</p>
            <p class="user-stats-label">max streak</p>
          </div>
          <div class="user-stats-detail">
            <p>{{ user.season.seasonLevel }}</p>
            <p class="user-stats-label">Level</p>
          </div>
          <div class="user-stats-detail">
            <p>{{ user.coins }}</p>
            <p class="user-stats-label">coins</p>
          </div>
        </div>
      </div>

      <div class="user-options">
        <p class="user-header-exp">
          <span class="user-header-exp-value"
            >exp: {{ user.season.exp }}/{{ expNeeded }}</span
          >
          <span
            :style="{ width: `${expRatio}%` }"
            class="user-header-exp-bar"
          ></span>
        </p>
        <!--<p>
          {{ expNeeded - this.user.season.exp }}xp left to level up
        </p>-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["user/getUserData"];
    },
    expNeeded() {
      const currentLevel = this.user.season.seasonLevel;
      return ((currentLevel * (currentLevel + 1)) / 2) * 150;
    },
    expRatio() {
      return Math.floor((this.user.season.exp / this.expNeeded) * 100);
    },
  },
  methods: {
    async resetStats() {
      try {
        await this.$http.post("/user/stats/reset");
        const user = await this.$http.get("/user");
        this.$store.commit("user/SET_USER", user.data);
      } catch (e) {
        this.alertSystem("Something went wrong, yo");
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.modal {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: #2b2b2b, $alpha: 0.6);
}

.user {
  width: 300px;
  height: 200px;
  padding: 15px;
  border-radius: 50px;
  background: #273137;
  box-shadow: 20px 20px 60px #212a2f, -20px -20px 60px #2d383f;

  &-header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border-radius: 50px;
    background: #273137;
    box-shadow: 10px 10px 20px #212a2f, -10px -10px 20px #2d383f;
    img {
      width: 40px;
      height: 40px;
      border-radius: 100%;
      border: 2px dashed #fafafa;
      margin-right: 15px;
    }
    p {
      margin: 0;
      font-size: 12px;
      font-weight: bolder;
      color: #fafafa;
    }

    &-rank {
      font-size: 11px;
      color: #687d8b;
    }

    &-exp {
      display: inline-block;
      height: 15px;
      font-size: 9px;
      line-height: 15px;
      width: 150px;
      position: relative;
      border-radius: 10px;
      overflow: hidden;
      margin-top: 2px;
      background-color: rgb(35, 38, 39);
      font-family: "Open Sans", sans-serif;
      &-bar {
        display: inline-block;
        width: 100%;
        height: 100%;
        background-color: #1b6fbe;
        position: absolute;
        z-index: 0;
      }

      &-value {
        margin-left: 15px;
        position: absolute;
        z-index: 1;
      }
    }
  }

  &-stats {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    color: #fafafa;
    width: 100%;
    margin-top: 10px;
    &-detail {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 50px;
      width: 30%;
      border-radius: 50px;
      background: #273137;
      box-shadow: 5px 5px 10px #212a2f, -5px -5px 10px #2d383f;
      font-size: 12px;

      p {
        margin: 0;
      }
    }

    &-label {
      font-size: 11px;
    }
  }

  &-options {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 5px;
    color: #fafafa;
    font-size: 9px;
    font-family: "Open Sans", sans-serif;

    p {
      margin: 0;
    }
  }

  &-reset-btn {
    padding: 5px 15px;
    margin: 5px;
    border: none;
    border-radius: 10px;
    background-color: rgba(220, 20, 60, 0.712);
    color: #fafafa;
    font-size: 11px;
  }
}
</style>