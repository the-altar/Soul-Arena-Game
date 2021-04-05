<template>
  <div class="modal">
    <div class="modal-content flex flex-col">
      <h4>What's your message?</h4>
      <textarea
        class="content"
        v-model="msg"
        placeholder="Type your message here"
      ></textarea>
      <p class="limit" :class="{ 'limit-overflow': limit - len <= 0 }">
        {{ limit - len }} charaters remaining
      </p>
      <div>
        <button class="btn btn-ok" @click="sendMessage()">Send</button>
        <button class="btn btn-cancel" @click="$clearModal()">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["status"],
  data() {
    return {
      msg: "",
      limit: 160,
    };
  },
  computed: {
    visibility() {
      return this.status;
    },
    len() {
      return this.msg.length;
    },
  },
  methods: {
    sendMessage() {
      if (this.limit - this.len < 0) return;
      this.$emit("send-message", this.msg);
      this.$clearModal();
    },
  },
};
</script>

<style lang='scss' scoped>
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

.modal {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba($color: #2b2b2b, $alpha: 0.6);
  font-family: "Comfortaa", cursive;

  &-content {
    width: 250px;
    border-radius: 5px;
    background-color: #2b2b2bc2;
    @include checkers(3px, 0.5);
    padding: 15px;

    h4 {
      margin: 5px;
      font-size: 12px;
      color: #fafafa;
    }
  }
}

.limit {
  margin: 5px;
  font-size: 11px;
  color: gray;
  &-overflow {
    color: rgb(219, 33, 70);
  }
}

.btn {
  outline: none;
  margin: 5px;
  border: none;
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  color: #fafafa;
  &-ok {
    background-color: rgb(5, 117, 108);
  }
  &-cancel {
    background-color: rgb(151, 8, 37);
  }
}

.content {
  width: 75%;
  height: 125px;
  font-size: 12px;
  margin: 5px;
  padding: 10px;
  color: #fafafa;
  border-radius: 10px;
  background-color: rgb(59, 59, 59);
  border: none;
  outline: none;
}
</style>