import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import VueLazyload from "vue-lazyload";

const app = createApp(App);

app.use(VueLazyload, {
  lazyComponent: true,
});

app.directive("intersect", {
  mounted(el, binding) {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          binding.value(entries);
        }
      });
    }, options);
    observer.observe(el);
  },
});

app.mount("#app");
