import Vue from "vue";
import FeatureFlag from "../util/feature-flag";
import { isIE, BannerComponent } from "../components/shared";
import IndexComponent from "./IndexComponent.vue";


FeatureFlag.setKeybinding();

Vue.prototype.$featureFlag = new FeatureFlag();

let app = new Vue({
  el: "#frontpage-app",
  data: {
      initializing: true
  },
  computed: {
      showIEBanner: function() {
          return isIE();
      }
  },
  components: {
      'banner': BannerComponent
  },
  methods: {
  },
  filters: {
  },
  mounted: function() {
      this.initializing = false;
  },
  render: r => r(IndexComponent)
});