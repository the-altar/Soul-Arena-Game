<template>
  <div class="mission" :key="mission.id">
    <div class="mission-info">
      <div @click="openGoalsModal()" class="mission-name">
        <h1>
          {{ mission.name }}
        </h1>
        <span :class="`mission-track mission-track-${status}`"></span>
      </div>

      <div v-if="mission.completed" class="mission-completed mission-tag">
        completed
      </div>
      <div
        v-else-if="!hasRequiredLevel"
        class="mission-tag mission-unavailable"
      >
        Unlock this assignment at level {{ mission.level_requirement }}
      </div>
      <div
        v-else-if="!mission.completed && !mission.tracking"
        class="mission-available mission-tag"
      >
        Available
      </div>
      <div v-else-if="mission.tracking" class="mission-tracking mission-tag">
        tracking
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["mission"],
  methods: {
    async openGoalsModal() {
      this.$emit("openGoalsModal", this.mission);
    },
  },
  computed: {
    status() {
      if (!this.hasRequiredLevel)
        return "unavailable";
      else if (!this.mission.completed && !this.mission.tracking)
        return "available";
      else if (this.mission.completed) return "completed";
      else if (this.mission.tracking) return "tracking";
      return "";
    },
    user() {
      return this.$store.getters["user/getUserData"];
    },
    hasRequiredLevel() {
      return this.user.season.seasonLevel >= this.mission.level_requirement;
    },
  },
};
</script>

<style lang='scss' scoped>
.mission {
  width: 100%;
  color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-banner {
    height: 175px;
    width: 250px;
    box-sizing: border-box;
    border: 1px solid #2b2b2b;
  }
  &-info {
    color: #fafafa;
    width: 100%;
    text-align: center;
    font-size: 12px;
    overflow: hidden;
  }
  &-name {
    height: 30px;
    margin: 0;
    font-weight: bold;
    width: 100%;
    background-color: #2b2b2b;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 20px;
    box-sizing: border-box;
    cursor: pointer;
    h1 {
      margin: 0;
      font-size: 12px;
    }
  }

  &-tag {
    font-family: Open Sans, sans-serif;
    font-size: 11px;
    text-align: left;
    padding-left: 20px;
  }
  &-option {
    text-align: center;
    background-color: #fafafa;
    margin: 0;
    color: #2b2b2b;
  }
  &-tracking {
    color: #2b2b2b;
    background-color: gold;
  }
  &-completed {
    color: #2b2b2b;
    background-color: turquoise;
  }
  &-available {
    color: #2b2b2b;
    background-color: greenyellow;
  }
  &-unavailable {
    color: #fafafa;
    background-color: crimson;
  }
  &-track {
    margin-right: 20px;
    display: inline-block;
    width: 3px;
    height: 3px;
    border-radius: 100%;
    margin-left: auto;
    &-available {
      background-color: gold;
      box-shadow: 0 0 5px 2px gold;
    }
    &-unavailable {
      background-color: crimson;
      box-shadow: 0 0 5px 2px crimson;
    }
    &-tracking {
      background-color: greenyellow;
      box-shadow: 0 0 5px 2px greenyellow;
    }
    &-completed {
      background-color: turquoise;
      box-shadow: 0 0 5px 2px turquoise;
    }
  }
}
</style>