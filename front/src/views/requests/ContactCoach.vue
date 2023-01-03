<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your E-Mail</label>
      <input type="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea id="message" rows="5" v-model.trim="message"></textarea>
    </div>
    <p class="errors" v-if="!formIsValid">
      Please enter a valid email address and not-empty message.
    </p>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
export default {
  name: "ContactCoach",
  data() {
    return {
      email: "",
      message: "",
      formIsValid: true,
    };
  },
  methods: {
    submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.message === ""
      ) {
        this.formIsValid = false;
        return;
      }
      this.$store.dispatch("requests/contactCoach", {
        coachId: this.$route.params.id,
        email: this.email,
        message: this.message,
      });
      this.$router.replace("/coaches");
    },
  },
};
</script>

<style scoped>
form {
  border-radius: 12px;
  border: 1px solid var(--light);
  margin: 1rem;
  padding: 1rem;
}
.form-control {
  margin: 0.5rem 0;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
input,
textarea {
  border: 1px solid var(--light);
  display: block;
  font: inherit;
  padding: 0.15rem;
  width: 100%;
}
input:focus,
textarea:focus {
  background-color: var(--bg-focus);
  border-color: var(--primary);
  outline: none;
}
.errors {
  color: red;
  font-weight: bold;
}
.actions {
  text-align: center;
}
</style>
