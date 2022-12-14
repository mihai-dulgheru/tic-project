<template>
  <main>
    <base-dialog :show="isLoading" fixed title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <base-dialog :show="!!error" title="An Error Occurred" @close="handleError">
      <p>
        {{ error }}
      </p>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="password" />
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (at least 6 characters).
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </main>
</template>

<script>
export default {
  name: "UserAuth",
  data() {
    return {
      email: null,
      password: null,
      formIsValid: true,
      mode: "login",
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      return this.mode === "login" ? "Login" : "Signup";
    },
    switchModeButtonCaption() {
      return this.mode === "login" ? "Signup instead" : "Login instead";
    },
  },
  methods: {
    async login(actionPayload) {
      await this.$store.dispatch("login", actionPayload);
    },
    async signup(actionPayload) {
      await this.$store.dispatch("signup", actionPayload);
    },
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === "" ||
        !this.email.includes("@") ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }
      this.isLoading = true;
      const actionPayload = {
        email: this.email,
        password: this.password,
      };
      try {
        if (this.mode === "login") {
          await this.login(actionPayload);
        } else {
          await this.signup(actionPayload);
        }
        const redirect = "/" + (this.$route.query?.redirect || "coaches");
        this.$router.replace(redirect);
      } catch (error) {
        this.error = error.message || "Failed to authenticate. Try again!";
      }
      this.isLoading = false;
    },
    switchMode() {
      this.mode = this.mode === "login" ? "signup" : "login";
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style scoped>
form {
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
</style>
