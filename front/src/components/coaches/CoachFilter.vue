<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <div class="filters">
      <span class="filter-option">
        <input type="checkbox" id="frontend" checked @change="setAreas" />
        <label for="frontend">Frontend</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="backend" checked @change="setAreas" />
        <label for="backend">Backend</label>
      </span>
      <span class="filter-option">
        <input type="checkbox" id="career" checked @change="setAreas" />
        <label for="career">Career</label>
      </span>
      <span class="filter-text">
        <label for="name">
          <i class="fa-solid fa-magnifying-glass"></i>
        </label>
        <input
          :value="filters.name"
          @input="setName"
          autocomplete="off"
          id="name"
          placeholder="Search by name"
          type="text"
        />
        <button v-if="xmarkIsVisible" class="xmark" @click="clearInput">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </span>
    </div>
  </base-card>
</template>

<script>
export default {
  name: "CoachFilter",
  emits: ["change-filter"],
  data() {
    return {
      filters: {
        backend: true,
        career: true,
        frontend: true,
        name: "",
      },
    };
  },
  methods: {
    setAreas(event) {
      const inputId = event.target.id;
      const isChecked = event.target.checked;
      const updatedFilters = {
        ...this.filters,
        [inputId]: isChecked,
        name: this.name,
      };
      this.filters = updatedFilters;
      this.$emit("change-filter", updatedFilters);
    },
    setName(event) {
      this.filters.name = event.target.value;
      this.filters = {
        ...this.filters,
        name: this.filters.name,
      };
      this.$emit("change-filter", this.filters);
    },
    clearInput() {
      this.filters.name = "";
      this.filters = {
        ...this.filters,
        name: "",
      };
      this.$emit("change-filter", this.filters);
    },
  },
  computed: {
    xmarkIsVisible() {
      return this.filters.name?.length > 0 || false;
    },
  },
};
</script>

<style scoped>
button {
  all: unset;
}
h2 {
  margin: 0.5rem 0;
}
.filters {
  display: flex;
  align-items: center;
  column-gap: 1rem;
}

.filter-text {
  display: inline-flex;
  align-items: center;
  border-bottom: 1px solid var(--light);
  padding: 0.125rem 0;
}
.filter-option label,
.filter-option input,
.filter-text label {
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
}
.filter-text input {
  border: none;
  font-size: medium;
  outline: none;
}
.filter-option label,
.filter-text label {
  margin-left: 0.25rem;
}
.filter-text label {
  margin-right: 0.25rem;
}
.xmark {
  cursor: pointer;
  padding: 0 0.25rem;
  user-select: none;
}
</style>
