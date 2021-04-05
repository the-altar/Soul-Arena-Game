<template>
  <div class="login">
    <div class="login-container">
      <input
        class="login-input"
        v-model="username"
        type="text"
        placeholder="Username"
      />
      <input
        class="login-input"
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <div class="login-checkbox">
        <input v-model="rememberMe" type="checkbox" />
        <label>Remember me</label>
      </div>
      <button v-if="!waiting" @click="login" class="login-btn">Login</button>
      <div v-else class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <p class="login-error">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      rememberMe: false,
      waiting: false,
      error: "",
    };
  },
  methods: {
    async login() {
      this.waiting = true;
      const res = await this.$http.post("/user/login", {
        username: this.username,
        password: this.password,
      });
      this.waiting = false;
      if (res.data.success) {
        this.$router.push({ name: "landing" });
      } else {
        this.error = "Oops, something went wrong! Check your credentials.";
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 550px;
  background: #2193b0; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to bottom,
    #6dd5ed,
    #2193b0
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to bottom,
    #6dd5ed,
    #2193b0
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  &-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fafafa;
    padding: 20px;
    box-shadow: 5px 5px 13px 5px rgba($color: #000000, $alpha: 0.1);
  }

  &-input {
    border: none;
    outline: none;
    padding-left: 10px;
    height: 40px;
    margin: 10px;
    border-radius: 20px;
    width: 250px;
    font-size: 12px;
    font-family: inherit;
    background-color: #aeefff;
    color: #024a5c;
  }
  &-btn {
    width: 150px;
    height: 40px;
    margin: 10px;
    border-radius: 20px;
    background: #2193b0; /* fallback for old browsers */
    color: #fafafa;
  }

  &-header {
    font-size: 20px;
    margin: 10px;
  }

  &-checkbox {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #2193b0;
    input {
      margin-right: 10px;
    }
  }

  &-login {
    margin: 10px;
    font-size: 10px;
    color: rgb(180, 106, 121);
  }
}

.lds-facebook {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-facebook div {
  display: inline-block;
  position: absolute;
  left: 8px;
  width: 16px;
  background: rgb(119, 167, 221);
  animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}
.lds-facebook div:nth-child(1) {
  left: 8px;
  animation-delay: -0.24s;
}
.lds-facebook div:nth-child(2) {
  left: 32px;
  animation-delay: -0.12s;
}
.lds-facebook div:nth-child(3) {
  left: 56px;
  animation-delay: 0;
}
@keyframes lds-facebook {
  0% {
    top: 8px;
    height: 64px;
  }
  50%,
  100% {
    top: 24px;
    height: 32px;
  }
}
</style>