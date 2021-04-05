<template>
  <div class='lobby'>
    <section class='lobby-members'>
      <h1 class='lobby-header'>Who's online</h1>
      <div class='lobby-member' v-for='(member, key) in membersOnline' :key='key'>
        <img
          class='lobby-avatar lobby-avatar-mini'
          :src='`https://api.adorable.io/avatars/75/${member.avatarId}`'
        />
        <p class='lobby-member-name'>{{member.username}}</p>
      </div>
    </section>

    <section class='lobby-chat'>
      <div class='lobby-chat-view' ref='chatView'>
        <div v-for='(message, key) in chatMessageList' :key='key' class='lobby-chat-message'>
          <h1 class='lobby-chat-message-sender'>{{message.sender.username}}</h1>
          <p class='lobby-chat-message-content'>{{message.content}}</p>
        </div>
      </div>
      <div class='lobby-chat-textbox'>
        <textarea
          @keydown.enter='sendMessage'
          @keyup.enter="message=''"
          v-model='message'
          class='lobby-chat-textbox-input'
          placeholder='type your message...'
        ></textarea>
        <button @click='sendMessage' class='lobby-btn'>send</button>
      </div>
    </section>
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
      membersOnline: {},
      lobby: null,
      message: "",
      chatMessageList: []
    };
  },
  components,
  computed,
  methods,
  watchers,
  mounted() {
    this.$colyseus
      .joinOrCreate("lobby", this.$store.getters["user/getUserData"])
      .then(room => {
        room.onMessage("joined", msg => {
          this.membersOnline = msg;
        });

        room.onMessage("left", msg => {
          this.membersOnline = msg;
        });

        room.onMessage("message", msg => {
          this.chatMessageList.push(msg);
          setTimeout(() => {
            this.$refs.chatView.scrollTop = this.$refs.chatView.scrollHeight;
          }, 100);
        });

        this.lobby = room;
      })
      .catch(err => alert(err));
  },
  beforeDestroy() {
    if (this.lobby !== null) {
      this.lobby.leave();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style";
</style>