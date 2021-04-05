<template>
  <article class="detail" :class="`${theme}-lighter`">
    <slot></slot>
    <div class="detail__bottom">
      <span
        v-if="
          unlocked.includes(character.id) || character.isFree || userRank >= 100
        "
      >
        <img
          class="detail__skill"
          v-for="(skill, key) in character.skills.slice(0,4)"
          @click="seeSkill(skill)"
          :key="key"
          :src="`/uploads/${skill.skillpic}.jpg`"
        />
      </span>
      <button
        v-if="
          unlocked.includes(character.id) || character.isFree || userRank >= 100
        "
        class="detail__btn"
        @click="characterSelect"
      >
        Add
      </button>
      <button v-else @click="showButtonDialog()" class="detail-cost">
        {{ character.cost }} <img src="@/assets/img/coins_1.svg" />
      </button>
    </div>
  </article>
</template>

<script>
export default {
  props: ["character"],
  methods: {
    seeSkill(skill) {
      this.$store.dispatch("audio/playClick");
      this.$emit("change-component-view", {
        component: "CharacterDetailSkill",
        data: skill,
      });
    },
    characterSelect() {
      this.$emit("add-to-team");
    },
    showButtonDialog() {
      if (this.character.cost <= this.funds)
        this.$modal.show("dialog", {
          title: `This license unlocks ${this.character.name}`,
          text: `${this.character.cost} coins will be credited from your account, are you sure you want to proceed?`,
          buttons: [
            {
              title: "Purchase",
              handler: () => {
                this.purchase();
              },
            },
            {
              title: "Cancel",
              handler: () => {
                this.$modal.hide("dialog");
              },
            },
          ],
        });
      else {
        this.$modal.show("dialog", {
          title: `This license unlocks ${this.character.name}`,
          text: `Not enough coins. You can earn more by playing ladder games'`,
          buttons: [
            {
              title: "Cancel",
              handler: () => {
                this.$modal.hide("dialog");
              },
            },
          ],
        });
      }
    },
    /*dialogEvent(eventName) {
      console.log("Dialog event: " + eventName);
    },*/
    async purchase() {
      try {
        this.$modal.hide("dialog");
        this.alertSystem({
          msg: `Processing request...`,
          status: "alert",
        });
        await this.$http.post("/character/purchase", {
          coins: this.character.cost,
          userId: this.$store.getters["user/getUserData"].id,
          characterId: this.character.id,
        });
        this.$store.getters["user/getUserData"].unlocked.push(
          this.character.id
        );
        this.$store.getters["user/getUserData"].coins -= this.character.cost;
        this.alertSystem({
          msg: `${this.character.name} has been added to your collection!`,
          status: "success",
        });
      } catch (err) {
        this.alertSystem("oops, something went wrong...");
      }
    },
  },
  computed: {
    unlocked() {
      return this.$store.getters["user/getUserData"].unlocked;
    },
    funds() {
      return this.$store.getters["user/getUserData"].coins;
    },
    userRank() {
      return this.$store.getters["user/getUserData"].rank.authLevel;
    },
  },
};
</script>

<style lang="scss">
@mixin checkers($size: 40px, $contrast: 0.07) {
  $checkerColor: rgba(#000, $contrast);
  $angle: 45deg;
  $tp: 25%;

  background-image: linear-gradient($angle, $checkerColor $tp, transparent $tp),
    linear-gradient(-$angle, $checkerColor $tp, transparent $tp),
    linear-gradient($angle, transparent 3 * $tp, $checkerColor 3 * $tp),
    linear-gradient(-$angle, transparent 3 * $tp, $checkerColor 3 * $tp);
  background-size: $size $size;
  background-position: 0 0, 0 $size/2, $size/2 -1 * $size/2, -1 * $size/2 0;
}

.detail {
  height: 200px;
  width: 400px;
  background-size: contain;
  padding-left: 25px;
  margin-left: 25px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-image: url("~@/assets/img/bg/rosterdark.png");
  background-size: 75px;
  border-top-right-radius: 40px;
  border-bottom-right-radius: 40px;
  background-blend-mode: soft-light;
  box-shadow: 0 0 5px 2px rgba($color: black, $alpha: 0.3);
  &::before {
    content: "";
    display: inline-block;
    height: 200px;
    width: 20px;
    position: absolute;
    transform: skew(5deg);
    background-color: #1d1b1b;
    left: 120px;
  }

  &__skill {
    height: 30px;
    margin-right: 10px;
  }

  &__btn {
    background-color: #2b2b2b;
    color: white;
    border: none;
    width: 60px;
    height: 30px;
    border-radius: 10px;
    margin: 5px;
  }

  &__bottom {
    display: flex;
  }

  &-cost {
    background-color: #fafafa;
    width: 100px;
    border-radius: 20px;
    color: #2b2b2b;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    img {
      height: 20px;
      margin-left: 5px;
    }

    &:hover {
      background-color: #fafafa;
      color: #2b2b2b;
    }
    span {
      font-size: 8px;
    }

    &-col {
      font-size: 12px;
      flex-direction: column;
    }
  }
}
</style>
