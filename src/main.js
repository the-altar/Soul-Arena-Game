import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as Colyseus from "colyseus.js";
import VueDragDrop from "vue-drag-drop";
import VTooltip from "v-tooltip";
import VModal from "vue-js-modal";
import Axios from "axios";
import GlobalMixin from "./mixin";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css"; //Vuesax styles
import "./registerServiceWorker";

require("vue2-animate/dist/vue2-animate.min.css");

Vue.use(Vuesax, {});

Vue.use(VModal, { dialog: true });
Vue.use(VTooltip);
Vue.use(VueDragDrop);
Vue.mixin(GlobalMixin);
//Vue.config.productionTip = false
const url =
  (window.location.protocol === "https:" ? "wss://" : "ws://") +
  window.location.host;
// create global colyseus client as instance property
Vue.prototype.$colyseus = new Colyseus.Client(url);
// create global event bus as instance property
Vue.prototype.$eventBus = new Vue();
Vue.prototype.$http = Axios;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
