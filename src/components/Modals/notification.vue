<template>
  <div class="notification flex" :class="`notification-${status}`">
    <p class="notification-message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  computed: {
    message() {
      return this.$store.getters["lobby/GET_NOTIFICATION_MESSAGE"];
    },
    status() {
      return this.$store.getters["lobby/GET_NOTIFICATION_STATUS"];
    },
  },
  created() {
    setTimeout(() => {
      this.clearAlert();
    }, 4000);
  },
};
</script>

<style lang='scss' scoped>
.notification {
  position: absolute;
  bottom: 0;
  height: 50px;
  width: 100%;
  z-index: 2;
  &-message {
    font-size: 12px;
  }

  &-warning {
    background-color: rgba(220, 20, 60, 0.575);
    color: #fafafa;
  }

  &-success {
    background-color: rgba(0, 255, 85, 0.726);
    color: #2b2b2b;
  }
  &-alert {
    background-color: rgba(255, 238, 0, 0.801);
    color: #2b2b2b;
  }
}
</style>>
