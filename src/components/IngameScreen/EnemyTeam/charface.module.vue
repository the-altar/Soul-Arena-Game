<template>
  <section class="enemy-char" v-if="char !== false">
    <div class="status" :class="`${theme}-status`" @click="interact()">
      <charface
        :facepic="char.facepic"
        :ko="char.knockedOut"
        :isTarget="char.isTarget"
        :index="index"
        :reverse="true"
      />

      <healthbar :hp="char.hitPoints" :index="index" />
    </div>

    <SkillQueue :index="index" :reversed="true" />
  </section>
</template>

<script>
import charface from "@/components/IngameScreen/charface.vue";
import healthbar from "@/components/IngameScreen/healthbar.vue";
import SkillQueue from "@/components/IngameScreen/skillQueue.vue";
export default {
  components: { healthbar, charface, SkillQueue },
  props: ["char", "index"],
  methods: {
    selectTarget() {
      // emit received by MyTeam/index
      this.$eventBus.$emit("set-target", this.index);
      this.$store.commit("game/setSkillInFocus", {});
      this.$store.commit("game/resetTargetables");
    },
    removeFromTempQueue(s) {
      if (this.$store.getters["game/isBusy"]) return;
      this.$store.commit("game/setBusyStatus", true);
      const room = this.$store.getters["game/getBattleRoom"];
      room.send("remove-skill-from-queue", s);
    },
    displayCharInfo() {
      this.$eventBus.$emit("selected-a-char", this.char);
    },
    interact() {
      if (this.char.isTarget) this.selectTarget();
      else this.displayCharInfo();
    },
  },
  computed: {
    isTarget() {
      return this.$store.getters["game/getCharacterByIndex"](this.index);
    },
    tempQueue() {
      return this.$store.getters["game/getTempQueueByCharacter"];
    },
    skill() {
      return this.$store.getters["game/getSkillByCaster"];
    },
    skillQueue() {
      return this.$store.getters["game/getSkillQueueById"];
    },
    playerId() {
      return this.$store.getters["user/getUserData"].id;
    },
  },
};
</script>

<style lang="scss">
.tempSkill {
  width: 30px;
  border-radius: 50%;
  margin: 1px;
}
</style>