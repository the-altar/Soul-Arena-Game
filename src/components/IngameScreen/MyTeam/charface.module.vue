<template>
  <div class="status" :class="`${theme}-status`" @click="interact()">
    <charface
      :facepic="char.facepic"
      :ko="char.knockedOut"
      :isTarget="char.isTarget"
      :index="index"
    />
    <healthbar :hp="char.hitPoints" :index="index" />
  </div>
</template>

<script>
import healthbar from "@/components/IngameScreen/healthbar.vue";
import charface from "@/components/IngameScreen/charface.vue";
export default {
  components: { healthbar, charface },
  props: ["char", "index"],
  methods: {
    selectTarget() {
      // emit received by MyTeam/index
      this.$eventBus.$emit("set-target", this.index);
      this.$store.commit("game/setSkillInFocus", {});
      this.$store.commit("game/resetTargetables");
    },

    displayCharInfo() {
      this.$eventBus.$emit("selected-a-char", this.char);
    },

    interact() {
      if (this.char.isTarget) this.selectTarget();
      else this.displayCharInfo();
    },
  },
};
</script>

<style lang="scss">
.status {
  padding: 2px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
</style>