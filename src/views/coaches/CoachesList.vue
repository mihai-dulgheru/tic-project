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
          <div class="controls__left">
            <div class="sort">
              <div class="sort__item" @click="handleClickName">
                <span class="labels">Name</span>
                <button class="sort__button">
                  <i class="fa-solid fa-sort sort__icon"></i>
                </button>
              </div>
              <div class="sort__item" @click="handleClickHourlyRate">
                <span class="labels">Hourly Rate</span>
                <button class="sort__button">
                  <i class="fa-solid fa-sort sort__icon"></i>
                </button>
              </div>
            </div>
          </div>

          <div>
            <base-button
              v-if="isLoggedIn && !isCoach && !isLoading"
              link
              to="/register"
              >Register as Coach</base-button
            >
            <base-button
              @click="loadCoaches(true)"
              class="refresh"
              mode="outline"
            >
              <i class="fa-solid fa-arrows-rotate"></i>
            </base-button>
          </div>
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
      orderBy: "name",
      order: "asc",
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
    handleClickName() {
      if (this.orderBy === "name") {
        this.order = this.order === "asc" ? "desc" : "asc";
      } else {
        this.orderBy = "name";
        this.order = "asc";
      }
      this.sortCoaches();
    },
    handleClickHourlyRate() {
      if (this.orderBy === "hourlyRate") {
        this.order = this.order === "asc" ? "desc" : "asc";
      } else {
        this.orderBy = "hourlyRate";
        this.order = "asc";
      }
      this.sortCoaches();
    },
    sortCoaches() {
      this.coaches.sort((a, b) => {
        if (this.orderBy === "name") {
          const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
          const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();
          if (nameA < nameB) {
            return this.order === "asc" ? -1 : 1;
          }
          if (nameA > nameB) {
            return this.order === "asc" ? 1 : -1;
          }
          return 0;
        } else if (this.orderBy === "hourlyRate") {
          if (a.hourlyRate < b.hourlyRate) {
            return this.order === "asc" ? -1 : 1;
          }
          if (a.hourlyRate > b.hourlyRate) {
            return this.order === "asc" ? 1 : -1;
          }
          return 0;
        }
      });
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
.controls__left {
  align-items: center;
  display: flex;
}
.sort {
  align-items: center;
  column-gap: 0.5rem;
  display: flex;
}
.sort__item {
  align-items: center;
  column-gap: 0.25rem;
  cursor: pointer;
  display: flex;
  user-select: none;
}
.labels {
  color: var(--dark);
  font-size: medium;
  text-transform: uppercase;
}
.sort__button {
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}
.sort__icon {
  color: var(--dark);
  font-size: medium;
  text-align: center;
}
.refresh {
  margin-right: 0;
}
</style>
