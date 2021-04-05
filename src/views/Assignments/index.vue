<template>
  <div class="missions">
    <div class="missions-menu">
      <button @click="sortBy(1)">
        <img src="~@/assets/img/icons/locked.svg" />
      </button>
      <button @click="sortBy(2)">
        <img src="~@/assets/img/icons/unlocked.svg" />
      </button>
      <button @click="sortBy(4)">
        <img src="~@/assets/img/icons/progress.svg" />
      </button>
      <button @click="sortBy(3)">
        <img src="~@/assets/img/icons/completed.svg" />
      </button>
      <button @click="$router.push({ name: 'home' })">
        <img src="~@/assets/img/icons/goback.svg" />
      </button>
    </div>

    <div class="missions-list">
      <mission
        v-for="(mission, key) of missions.slice(start, finish)"
        :key="key"
        :mission="mission"
        @openGoalsModal="openGoalsModal"
      ></mission>
      <div class="missions-navigator">
        <img
          src="/themes/midnight/next.svg"
          class="roster-list-next roster-list-next-reverse"
          @click="
            start = Math.max(0, start - 10);
            finish = Math.max(10, finish - 10);
          "
        />
        <span class="roster-points midnight-glow"></span>
        <img
          @click="
            start = Math.min(missions.length - 1, start + 10);
            finish = Math.min(missions.length, finish + 10);
          "
          src="/themes/midnight/next.svg"
          class="roster-list-next"
        />
      </div>
    </div>

    <goals
      :mission="selectedMission"
      :goals="selectedMissionGoals"
      :tracked="tracked"
    ></goals>
  </div>
</template>

<script>
import goals from "@/components/Assignments/goal.vue";
import mission from "@/views/Assignments/assignments.item.vue";

export default {
  components: {
    goals,
    mission,
  },
  data() {
    return {
      missions: [],
      selectedMission: {},
      selectedMissionGoals: [],
      start: 0,
      finish: 10,
    };
  },
  methods: {
    async openGoalsModal(mission) {
      this.selectedMissionGoals = [];
      this.selectedMission = mission;
      const r = await this.$http.get(`/mission/${this.selectedMission.id}`);
      if (r.data.success && r.data.goals.length > 0)
        this.selectedMissionGoals = r.data.goals[0].goals;
    },
    sortBy(index) {
      let stack = [];
      for (let i = this.missions.length - 1; i >= 0; i--) {
        if (this.status(this.missions[i]) !== index) {
          const m = this.missions.splice(i, 1)[0];
          stack.push(m);
        }
      }
      this.missions = this.missions.concat(stack);
    },
    status(mission) {
      if (!this.hasRequiredLevel(mission) && !mission.completed) return 1;
      else if (!mission.completed && !mission.tracking) return 2;
      else if (mission.completed) return 3;
      else if (mission.tracking) return 4;
      return 0;
    },
    hasRequiredLevel(mission) {
      return this.user.season.seasonLevel >= mission.level_requirement;
    },
  },
  async created() {
    const r = await this.$http.get("/mission");
    this.missions = r.data;
    this.openGoalsModal(this.missions[0]);
  },
  computed: {
    user() {
      return this.$store.getters["user/getUserData"];
    },
    tracked() {
      let tracked = 0;
      for (const i in this.missions) {
        if (this.missions[i].tracking) tracked++;
        if (tracked >= 3) return tracked;
      }
      return tracked;
    },
  },
};
</script>

<style lang='scss'>
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

.missions {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  color: #fafafa;

  &-heading {
    background-color: #2b2b2b;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin: 5px;
    border-radius: 20px;
    font-size: 14px;
  }

  &-notes {
    background-color: #2b2b2b;
    border-radius: 20px;
    padding: 5px;
    font-size: 12px;
    width: 80%;
    text-align: center;
  }

  &-list {
    width: 35%;
    height: 500px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: flex-start;
    background-color: rgba(43, 43, 43, 0.7);
    @include checkers(4px, 0.5);
  }

  &-menu {
    width: 100px;
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: rgba(43, 43, 43, 0.7);
    margin-right: 5px;

    button {
      color: #fafafa;
      outline: none;
      height: 75px;
      width: 75px;
      background-color: transparent;
    }

    img {
      height: 30px;
      padding: 10px;
      border-radius: 50%;
      border: 1px dashed #c4c4c4;
    }
  }
  &-navigator {
    width: 105px;
    margin-top: auto;
    margin-bottom: 5px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
}
</style>