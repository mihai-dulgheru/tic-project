<template>
  <header>
    <nav>
      <h1>
        <router-link to="/">Find a Coach</router-link>
      </h1>
      <ul>
        <li>
          <router-link to="/coaches">All Coaches</router-link>
        </li>
        <li v-if="isLoggedIn && isCoach">
          <router-link to="/requests">Requests</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/messages">Messages</router-link>
        </li>
        <li v-if="isLoggedIn">
          <router-link to="/profile">Profile</router-link>
        </li>
        <li v-if="!isLoggedIn">
          <base-button @click="login">
            <i class="fa-solid fa-right-to-bracket mr-1"></i>
            Login
          </base-button>
        </li>
        <li v-if="isLoggedIn">
          <base-button @click="logout">
            <i class="fa-solid fa-right-from-bracket mr-1"></i>
            Logout
          </base-button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TheHeader",
  computed: {
    ...mapGetters({
      isCoach: "coaches/isCoach",
      isLoggedIn: "isAuthenticated",
    }),
  },
  methods: {
    login() {
      this.$router.replace("/auth");
    },
    logout() {
      this.$store.dispatch("logout");
      this.$router.replace("/coaches");
    },
  },
};
</script>

<style scoped>
header {
  width: 100%;
  height: 5rem;
  background-color: var(--dark);
  display: flex;
  justify-content: center;
  align-items: center;
}
header a {
  text-decoration: none;
  color: hsl(0, 0%, 100%);
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
}
a:active,
a:hover,
a.router-link-active {
  border: 1px solid white;
}
h1 {
  margin: 0;
}
h1 a {
  color: hsl(0, 0%, 100%);
  margin: 0;
}
h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}
header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
li {
  margin: 0 0.5rem;
}
</style>
