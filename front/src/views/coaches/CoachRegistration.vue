<template>
  <section>
    <base-dialog
      :show="!!error"
      title="An Error Occurred!"
      @close="handleError"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <base-card v-else>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData"></coach-form>
    </base-card>
  </section>
</template>

<script>
import CoachForm from "@/components/coaches/CoachForm.vue";

export default {
  name: "CoachRegistration",
  components: {
    CoachForm,
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  methods: {
    handleError() {
      this.error = null;
    },
    async saveData(formData) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("coaches/registerCoach", formData);
        this.$router.replace("/coaches");
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
  },
};
</script>
