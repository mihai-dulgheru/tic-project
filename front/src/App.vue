<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <transition name="route" mode="out-in">
      <component :is="slotProps.Component"></component>
    </transition>
  </router-view>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    TheHeader,
  },
  computed: {
    ...mapGetters(["didAutoLogout"]),
  },
  created() {
    this.$store.dispatch("tryLogin");
  },
  watch: {
    didAutoLogout(newValue, oldValue) {
      if (newValue && !oldValue) {
        this.$router.replace("/auth");
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
@import "@/css/global.css";
@import "@/css/variables.css";

* {
  box-sizing: border-box;
}
html {
  font-family: "Roboto", sans-serif;
}
body {
  margin: 0;
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-1.875rem);
}
.route-enter-active {
  transition: all 0.3s ease-out;
}
.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.route-leave-active {
  transition: all 0.3s ease-in;
}
.route-leave-to {
  opacity: 0;
  transform: translateY(1.875rem);
}
/* Tablet */
@media only screen and (max-width: 1000px) {
  /* html {
    font-size: 62.5%;
  } */
  /* .login-form {
    width: 70%;
  }
  .field {
    width: 70%;
  }
  .plants {
    grid-template-columns: 1fr 1fr;
  }
  .reminders-container {
    grid-template-columns: 1fr 1fr;
  } */
}
/* Mobile */
@media only screen and (max-width: 600px) {
  /* html {
    font-size: 50%;
  } */
  /* .login-form {
    width: 80%;
  }
  .field {
    width: 70%;
  }
  .plants {
    grid-template-columns: 1fr;
  }
  .reminders-container {
    grid-template-columns: 1fr;
  } */
}
/* Desktop */
@media (min-width: 1000px) {
  /* html {
    font-size: 75%;
  } */
  /* .login-form {
    width: 50rem;
  }
  .field {
    width: 70%;
  }
  .plants {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .reminders-container {
    grid-template-columns: 1fr 1fr;
  } */
}
</style>
