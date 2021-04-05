<template>
  <div
    v-if="!char.knockedOut"
    class="skillqueue"
    :class="{ 'skillqueue-reversed': reversed }"
  >
    <v-popover trigger="hover" v-for="s in skillQueue" :key="s.id">
      <div class="skillqueue-icon">
        <p class="skillqueue-stack" v-if="s.stack > 1">
          {{ s.stack }}
        </p>
        <img
          class="skillqueue-pic puff-in-center"
          :src="`/uploads/${s.skillpic}.jpg`"
        />
      </div>
      <template slot="popover">
        <ul class="note">
          <li class="note-skillname">{{ s.skillName }}</li>
          <li v-for="(message, key) in s.tips" :key="key">
            <ul v-if="message.message">
              <li>- {{ message.message }}</li>
              <li class="note-turns">{{ parseDuration(message.duration) }}</li>
            </ul>
          </li>
          <li v-for="(message, key) in s.notifications" :key="key">
            <ul>
              <li>{{ message }}</li>
            </ul>
          </li>
        </ul>
      </template>
    </v-popover>

    <div>
      <img
        class="skillqueue-pic"
        v-for="(s, key) in tempQueue"
        @dblclick="removeFromTempQueue(s)"
        :key="key"
        :src="`/uploads/${skill(s.caster, s.skill).skillpic}.jpg`"
      />
    </div>
  </div>

  <div v-else class="skillqueue" :class="{ 'skillqueue-reversed': reversed }">
    <div>
      <img
        class="skillqueue-pic"
        v-for="(s, key) in tempQueue"
        @dblclick="removeFromTempQueue(s)"
        :key="key"
        :src="`/uploads/${skill(s.caster, s.skill).skillpic}.jpg`"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["index", "reversed"],
  computed: {
    myId: function () {
      return this.$store.getters["user/getUserData"].id;
    },
    skill: function () {
      return this.$store.getters["game/getSkillByCaster"];
    },
    turn: function () {
      return this.$store.getters["game/GetMyData"](this.myId).isTurn;
    },
    skillQueue: function () {
      return this.$store.getters["game/getSkillQueueById"](
        this.index,
        this.myId
      );
    },
    char: function () {
      return this.$store.getters["game/getCharacterByIndex"](this.index);
    },
    tempQueue: function () {
      return this.$store.getters["game/getTempQueueByCharacter"](this.index);
    },
  },
  methods: {
    removeFromTempQueue(s) {
      if (this.$store.getters["game/isBusy"]) return;
      this.$store.commit("game/setBusyStatus", true);

      const room = this.$store.getters["game/getBattleRoom"];
      room.send("remove-skill-from-queue", s);
      this.$store.commit("game/setBusyStatus", true);
    },
    parseDuration(duration) {
      if (duration > 1) return `${duration} turns left`;
      else if (duration === 1) return `${duration} turn left`;
      else if (duration === true) return "Infinite";
      else if (duration <= 0) return `Ends this turn`;
    },
  },
};
</script>

<style lang='scss'>
.skillqueue {
  height: 30px;
  display: flex;
  justify-content: left;
  align-items: center;
  padding-left: 20px;
  margin-top: 5px;
  margin-bottom: auto;
  &-icon {
    position: relative;
    height: 30px;
  }
  &-stack {
    margin: 0;
    position: absolute;
    font-family: "Teko", sans-serif;
    z-index: 1;
    color: white;
    font-size: 20px;
    font-weight: bold;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
  }
  &-pic {
    height: 25px;
    box-shadow: 1px 1px 2px 2px rgba($color: #000000, $alpha: 0.2);
    border-radius: 20px;
    margin-right: 2px;
    opacity: 0.5;
  }
  &-reversed {
    flex-direction: row-reverse;
  }
}

.tooltip {
  // ...

  &.popover {
    $color: #fafafa;
    max-width: 225px;
    .popover-inner {
      background: $color;
      font-family: "Open Sans", sans-serif;
      color: #2b2b2b;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }
}

li,
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.note {
  font-size: 11px;
  &-skillname {
    font-weight: bold;
    color: #f55442;
  }

  &-turns {
    color: #9e9e9e;
  }
}
</style>