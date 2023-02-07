<template>
  <main>
    <error-dialog :show="!!error" @close="handleError" title="Error!">
      <p>{{ error }}</p>
    </error-dialog>
    <section>
      <coach-filter @change-filter="setFilter"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">
            <i class="fa-solid fa-arrows-rotate"></i>
          </base-button>
          <base-button
            v-if="isLoggedIn && !isCoach && !isLoading"
            link
            to="/register"
            >Register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :key="coach.id"
            :id="coach.id"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :areas="coach.areas"
            :hourly-rate="coach.hourlyRate"
          ></coach-item>
        </ul>
        <h3 v-else>No coaches found.</h3>
      </base-card>
    </section>
  </main>
</template>

<script>
import CoachFilter from "@/components/coaches/CoachFilter.vue";
import CoachItem from "@/components/coaches/CoachItem.vue";
import { mapGetters } from "vuex";

export default {
  name: "CoachesList",
  components: {
    CoachFilter,
    CoachItem,
  },
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        backend: true,
        career: true,
        frontend: true,
        name: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      coaches: "coaches/coaches",
      hasCoaches: "coaches/hasCoaches",
      isCoach: "coaches/isCoach",
      isLoggedIn: "isAuthenticated",
    }),
    filteredCoaches() {
      const activeFilters = this.activeFilters || {};
      return this.coaches.filter((coach) => {
        const { areas = [], firstName = "", lastName = "" } = coach || {};
        const name = `${firstName} ${lastName}`.toLowerCase();
        const nameReverse = `${lastName} ${firstName}`.toLowerCase();
        return (
          ((activeFilters.frontend && areas?.includes("frontend")) ||
            (activeFilters.backend && areas?.includes("backend")) ||
            (activeFilters.career && areas?.includes("career"))) &&
          (!activeFilters.name ||
            (activeFilters.name &&
              (name.toLowerCase().includes(activeFilters.name.toLowerCase()) ||
                nameReverse
                  .toLowerCase()
                  .includes(activeFilters.name.toLowerCase()))))
        );
      });
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilter(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/loadCoaches", {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
}
</style>