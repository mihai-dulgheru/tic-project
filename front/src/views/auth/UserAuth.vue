<template>
  <main>
    <base-dialog :show="isLoading" fixed title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <error-dialog
      :show="!!error"
      @close="handleError"
      title="An Error Occurred"
    >
      <p>
        {{ error }}
      </p>
    </error-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-Mail</label>
          <input type="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <password-input
            id="password"
            v-model:password="password"
          ></password-input>
        </div>
        <p v-if="!formIsValid">
          Please enter a valid email and password (at least 6 characters).
        </p>
        <div class="form-actions">
          <base-button>{{ submitButtonCaption }}</base-button>
          <a class="form-switch" @click="switchMode">{{
            switchModeButtonCaption
          }}</a>
        </div>
      </form>
    </base-card>
  </main>
</template>

<script>
import PasswordInput from "@/components/ui/PasswordInput.vue";

export default {
  name: "UserAuth",
  components: {
    PasswordInput,
  },
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
  font-weight: 700;
  margin-bottom: 0.5rem;
}
input,
textarea {
  border-radius: 0.25rem;
  border: 1px solid var(--light);
  display: block;
  font: inherit;
  padding: 0.5rem;
  width: 100%;
}
input:focus,
textarea:focus {
  background-color: var(--bg-focus);
  border-color: var(--primary);
  outline: none;
}

.form-actions {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-switch {
  cursor: pointer;
  color: var(--primary);
}

.form-switch:hover {
  text-decoration: underline;
}
</style>
