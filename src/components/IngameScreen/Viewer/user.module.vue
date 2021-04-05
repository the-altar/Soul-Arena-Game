<template>
  <div class="user">
    <div class="user-avatar">
      <img
        :src="`/img/avatars/${data.avatar}`"
        :alt="`${data.username} avatar`"
      />
    </div>
    <div class="user-info">
      <div class="user-info-name">{{ data.username }}</div>
      <div class="user-info-stats">
        <p>Rank: {{ data.season.seasonRank }}</p>
        <p>
          Ratio: {{ data.season.wins }} - {{ data.season.losses }} ({{
            data.season.streak
          }})
        </p>
      </div>
    </div>

    <div class="user-charlist">
      <img
        v-for="(char, key) in charList"
        :key="key"
        :src="`/uploads/${char.facepic}.jpg`"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  computed: {
    charList() {
      const arr = [];
      for (const char of this.$store.getters["game/getMyCharList"](
        this.data.id
      )) {
        if (char) arr.push(char);
      }
      return arr;
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  width: 80%;
  height: 100%;
  display: flex;
  &-avatar {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    img {
      border: 1px solid black;
      height: 75px;
      width: 75px;
    }
  }

  &-info {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    width: 150px;
    height: 100%;
    font-size: 12px;
    margin-left: 15px;

    &-stats {
      p {
        margin: 0;
      }
      display: inline-flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  &-charlist {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 35px;
      border: 1px solid #fafafa;
    }
  }
}
</style>