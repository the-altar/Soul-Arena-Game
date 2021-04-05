<template>
  <div class="goal">
    <div class="goal-pic">
      <img :src="`/uploads/${mission.banner}.jpg`" />
    </div>
    <div class="goal-section">
      <h1 class="goal-title">{{ mission.name }}</h1>
      <div class="goal-difficulty">
        <img
          v-for="k in mission.difficulty_level"
          :key="k"
          src="~@/assets/img/icons/star.svg"
        />
      </div>
      <p class="goal-description">{{ mission.description }}</p>

      <div class="goal-goals">
        <li><b>Goals</b></li>
        <li v-for="(g, key) in mission.goals" :key="key">
          {{ g.description }}
          (
          <span v-if="goals[key]">{{ goals[key].battlesWon }}</span
          ><span v-else>0</span> / {{ g.battlesWon }} )
        </li>
      </div>
    </div>
    <div class="goal-character">
      <p>
        character unlocked:
        <b>{{ entity(mission.unlocked_entity).name }}</b>
      </p>

      <button
        class="goal-btn goal-btn--track"
        v-if="
          !mission.completed &&
          !mission.tracking &&
          this.hasRequiredLevel(this.mission.level_requirement)
        "
        @click="trackMission()"
      >
        Track
      </button>
      <button
        class="goal-btn goal-btn--stop"
        v-if="!mission.completed && mission.tracking"
        @click="stopTracking()"
      >
        Stop tracking
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["mission", "goals", "tracked"],
  computed: {
    user() {
      return this.$store.getters["user/getUserData"];
    },
  },
  methods: {
    entity(id) {
      const data = this.$store.getters["Roster/getRoster"];
      for (const i in data) {
        if (data[i].id === id) return data[i];
      }
      return {};
    },
    hasRequiredLevel(req) {
      return this.user.season.seasonLevel >= req;
    },
    async trackMission() {
      if (!this.hasRequiredLevel(this.mission.level_requirement)) return;
      const id = this.mission.id;
      const mission = JSON.parse(JSON.stringify(this.mission.goals)).map(
        (g) => {
          g.battlesWon = 0;
          return g;
        }
      );
      try {
        if (this.tracked >= 3) {
          this.alertSystem({
            msg: "You can't track more than 3 missions at once!",
            status: "warning",
          });
          return;
        }
        await this.$http.post("/track", [id, JSON.stringify(mission)]);
        this.mission.tracking = true;
        this.alertSystem({
          msg:`You're now tracking ${this.mission.name}`,
          status:"success"
        })
      } catch (err) {
        this.alertSystem({
          msg: "Something went wrong! We likely couldn't track your mission ):",
          status: "warning",
        });
      }
    },
    async stopTracking() {
      try {
        const missionId = this.mission.id;
        const r = await this.$http.delete(`/mission/${missionId}`);
        if (r.data.success) {
          this.mission.tracking = false;
          this.goals = [];
        }
      } catch (err) {
        this.alertSystem({
          msg: "It appears something went wrong...",
          status: "warning",
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.goal {
  width: 370px;
  height: 500px;
  margin: 5px 0 5px 5px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  background-color: rgba($color: #2b2b2b, $alpha: 0.7);
  &-pic {
    width: 100%;
    height: 35%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid black;
    background-color: rgba($color: #2b2b2b, $alpha: 0.5);
    img {
      border: 1px solid black;
    }
  }

  &-title {
    margin-top: 15px;
    margin-bottom: 0;
    font-size: 14px;
    padding: 2px;
  }

  &-description {
    font-size: 12px;
    margin: 5px;
    width: 90%;
    font-family: "Open Sans", sans-serif;
  }

  &-goals {
    font-size: 12px;
    margin: 5px;
    list-style: none;
    width: 90%;
  }

  &-character {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 15%;
    img {
      border-radius: 10px;
      border: 1px solid darkcyan;
      box-shadow: 0 0 10px 1px darkcyan;
      margin: 5px;
    }
    p {
      font-size: 12px;
    }
  }

  &-btn {
    height: 25px;
    width: 150px;
    border-radius: 5px;
    color: #fafafa;
    cursor: pointer;

    &--track {
      background-color: darkcyan;
    }
    &--stop {
      background-color: crimson;
    }
  }
  &-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 50%;
    border-bottom: 1px solid black;
    background-color: rgba($color: #2b2b2b, $alpha: 0.7);
  }

  &-difficulty {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      height: 15px;
      margin: 5px;
    }
  }
}
</style>