<template>
  <div>
    <Character :id='selectedChar.id' :banner='banner'>
      <!-- EVENTS TRANSMITER: add char to team and change component view -->
      <CharacterDetail
        v-if='selectedChar'
        :character='selectedChar'
        @change-component-view='updateView'
        @add-to-team='addToTeam'
      >
        <component :is='component' :data='viewData'></component>
      </CharacterDetail>
    </Character>

    <Roster @char-selected='setChar' @add-to-team='addToTeam'></Roster>

    <!--<img class="selection-icon" src="~@/assets/img/iconhome.png">-->
  </div>
</template>

<script>
import components from "./script/components";
import computed from "./script/computed";
import methods from "./script/methods";
import watchers from "./script/watchers";

export default {
  data() {
    return {
      selectedChar: false,
      component: "CharacterDetailProfile",
      viewData: {},
      banner: false,
    };
  },
  components,
  computed,
  methods,
  watchers
};
</script>

<style lang="scss">
@import "./style";
</style>