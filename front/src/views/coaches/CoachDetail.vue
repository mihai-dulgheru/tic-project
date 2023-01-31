<template>
  <main>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach out now!</h2>
          <base-button link :to="contactLink">Contact</base-button>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </main>
</template>

<script>
export default {
  name: "CoachDetails",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedCoach: null,
    };
  },
  computed: {
    fullName() {
      return `${this.selectedCoach?.firstName || ""} ${
        this.selectedCoach?.lastName || ""
      }`;
    },
    rate() {
      return Math.round((this.selectedCoach?.hourlyRate || 0) * 100) / 100;
    },
    contactLink() {
      return `/coaches/${this.id}/contact`;
    },
    areas() {
      return this.selectedCoach?.areas || [];
    },
    description() {
      return this.selectedCoach?.description || "";
    },
  },
  methods: {
    async getCoach(id) {
      this.selectedCoach = await this.$store.dispatch("coaches/loadCoach", {
        id,
      });
    },
  },
  created() {
    this.getCoach(this.id);
  },
};
</script>
