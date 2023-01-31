<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button link :to="coachContactLink" mode="outline"
        >Contact</base-button
      >
      <base-button link :to="coachDetailsLink">View Details</base-button>
    </div>
  </li>
</template>

<script>
export default {
  name: "CoachItem",
  props: {
    id: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    areas: {
      type: Array,
      required: true,
    },
    hourlyRate: {
      type: Number,
      required: true,
    },
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    },
    rate() {
      return Math.round(this.hourlyRate * 100) / 100;
    },
    coachContactLink() {
      return `${this.$route.path}/${this.id}/contact`;
    },
    coachDetailsLink() {
      return `${this.$route.path}/${this.id}`;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid var(--dark);
  border-radius: 0.75rem;
  padding: 1rem;
}
h3 {
  font-size: 1.5rem;
}
h3,
h4 {
  margin: 0.5rem 0;
}
div {
  margin: 0.5rem 0;
}
.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
