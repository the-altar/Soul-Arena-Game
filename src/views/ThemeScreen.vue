<template>
  <div class="theme flex flex-col">
    <div class="theme-items flex">
      <div
        class="theme-items-option flex flex-col"
        v-for="theme of themes"
        :key="theme.id"
      >
        <p>{{ theme.name }}</p>
        <button class="theme-btn" @click="selectTheme(theme)">
          Select theme
        </button>
      </div>
    </div>

    <div class="flex">
      <button
        class="theme-btn theme-btn--medium"
        @click="$router.push({ name: 'home' })"
      >
        Go back
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      themes: [],
    };
  },
  methods: {
    async selectTheme(theme) {
      try {
        await this.$http.post("/user/set-theme", {
          themeId: theme.id,
        });
        this.user.theme = theme.name;
        this.$store.commit("SET_THEME", theme.name);
        this.clearMidori();
      } catch (e) {
        alert(e);
      }
    },

    clearMidori: function () {
      this.$store.commit("midori/cleanUp");
      this.$store
        .dispatch("midori/setCanvas", {
          canvas: this.$parent.$refs.canvas,
          theme: this.theme,
        })
        .then(() => {
          this.$store.commit("midori/setHomeBackground", 2);
        });
    },
  },
  async created() {
    const res = await this.$http.get("/api/themes");
    this.themes = res.data;
  },
};
</script>

<style lang="scss" scoped>
.theme {
  width: 100%;
  height: 100%;

  &-items {
    &-option {
      margin: 10px;
      width: 150px;
      height: 250px;
      color: #fafafa;
      background-color: #2727277e;
    }
  }

  &-btn {
    border: none;
    border-radius: 20px;
    border: 1px solid #fafafa;
    background-color: #2b2b2b56;
    color: #fafafa;
    padding: 4px;

    &--medium {
      width: 125px;
      height: 40px;
    }
  }
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;

  &-col {
    flex-direction: column;
  }
}
</style>