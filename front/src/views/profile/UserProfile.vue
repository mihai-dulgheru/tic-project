<template>
  <main>
    <base-dialog :show="!!success" @close="handleSuccess" title="Success!">
      <p>{{ success }}</p>
    </base-dialog>
    <error-dialog :show="!!error" @close="handleError" title="Error!">
      <p>{{ error }}</p>
    </error-dialog>
    <section>
      <base-card>
        <header>
          <h2>User's Profile</h2>
        </header>
        <div>
          <form @submit.prevent="submitForm">
            <div class="form-control">
              <label for="name">Name</label>
              <input
                @blur="clearValidity('name')"
                id="name"
                type="text"
                v-model.trim="name.value"
              />
              <p v-if="!this.name.isValid" class="error">
                Name must not be empty.
              </p>
            </div>
            <div class="form-control">
              <label for="email">Email</label>
              <input
                @blur="clearValidity('email')"
                id="email"
                type="email"
                v-model.trim="email.value"
              />
              <p v-if="!this.email.isValid" class="error">
                Email must not be empty.
              </p>
            </div>
            <div class="actions">
              <base-button>Save</base-button>
            </div>
          </form>
        </div>
      </base-card>
    </section>

    <section>
      <base-card>
        <header>
          <h2>Change Password</h2>
        </header>
        <div>
          <form @submit.prevent="submitPasswordForm">
            <div class="form-control">
              <label for="password">Password</label>
              <password-input
                @blur="clearValidity('password')"
                id="password"
                v-model:password="password.value"
              ></password-input>
              <p v-if="!this.password.isValid" class="error">
                Password must not be empty.
              </p>
            </div>
            <div class="form-control">
              <label for="confirmPassword">Confirm Password</label>
              <password-input
                @blur="clearValidity('confirmPassword')"
                id="confirmPassword"
                v-model:password="confirmPassword.value"
              ></password-input>
              <p v-if="!this.confirmPassword.isValid" class="error">
                Passwords must match.
              </p>
            </div>
            <div class="actions">
              <base-button>Change Password</base-button>
            </div>
          </form>
        </div>
      </base-card>
    </section>

    <section>
      <base-card>
        <div class="subhead subhead--spacious">
          <h2 class="subhead-heading subhead-heading--danger">
            Delete Account
          </h2>
        </div>
        <p>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button class="button button-danger" @click="deleteAccount">
          Delete Your Account
        </button>
        <confirm-dialog ref="confirmDialog"></confirm-dialog>
      </base-card>
    </section>
  </main>
</template>

<script>
import ConfirmDialog from "@/components/ui/ConfirmDialog.vue";
import PasswordInput from "@/components/ui/PasswordInput.vue";

export default {
  name: "UserProfile",
  components: {
    ConfirmDialog,
    PasswordInput,
  },
  data() {
    return {
      confirmPassword: {
        value: null,
        isValid: true,
      },
      email: {
        value: null,
        isValid: true,
      },
      name: {
        value: null,
        isValid: true,
      },
      password: {
        value: null,
        isValid: true,
      },
      error: null,
      isLoading: false,
      success: null,
    };
  },
  async created() {
    await this.loadProfile();
    this.name.value = this.$store.getters["profile/name"];
    this.email.value = this.$store.getters["profile/email"];
  },
  methods: {
    async loadProfile() {
      this.isLoading = true;
      try {
        await this.$store.dispatch("profile/fetchProfile");
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
    validateUsersProfileForm() {
      this.name.isValid = !!this.name.value;
      this.email.isValid = !!this.email.value;
      return this.name.isValid && this.email.isValid;
    },
    validateChangePasswordForm() {
      this.password.isValid = !!this.password.value;
      this.confirmPassword.isValid =
        !!this.confirmPassword.value &&
        this.password.value === this.confirmPassword.value;
      return this.password.isValid && this.confirmPassword.isValid;
    },
    async submitForm() {
      if (!this.validateUsersProfileForm()) {
        return;
      }
      try {
        await this.$store.dispatch("profile/saveProfile", {
          name: this.name.value,
          email: this.email.value,
        });
        this.success = "Profile saved successfully!";
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
    async submitPasswordForm() {
      if (!this.validateChangePasswordForm()) {
        return;
      }
      try {
        await this.$store.dispatch("profile/changePassword", {
          password: this.password.value,
          confirmPassword: this.confirmPassword.value,
        });
        this.success = "Password changed successfully!";
        this.password.value = null;
        this.confirmPassword.value = null;
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
    async deleteAccount() {
      const result = await this.$refs.confirmDialog.handleShow({
        closeButton: "Cancel",
        message:
          "Do you really want to delete your account? This action cannot be undone.",
        saveButton: "Delete",
        title: "Are you sure?",
      });
      if (result) {
        try {
          await this.$store.dispatch("profile/deleteAccount");
          this.$router.push("/auth");
        } catch (error) {
          this.error = error.message || "Something went wrong!";
        }
      }
    },
    handleError() {
      this.error = null;
    },
    handleSuccess() {
      this.success = null;
    },
    clearValidity(input) {
      this[input].isValid = true;
    },
  },
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
}
header {
  text-align: center;
}
h2 {
  font-size: 1.5rem;
  margin: 0;
}
form {
  border-radius: 0.75rem;
  border: 1px solid var(--light);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;
  padding: 1rem;
  row-gap: 0.5rem;
}
.form-control {
  margin: 0.5rem 0;
}
.form-control div {
  align-items: center;
  display: flex;
  justify-self: flex-start;
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
.errors {
  color: var(--error);
  font-weight: 700;
}
.actions {
  text-align: center;
}
.subhead {
  border-bottom: 1px solid hsl(214, 13%, 90%);
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
}
.subhead--spacious {
  margin-top: 0.5rem;
}
.subhead-heading {
  flex: 1 1 auto;
  font-size: 1.5rem;
  font-weight: 400;
  order: 0;
}
.subhead-heading--danger {
  color: var(--error);
  font-weight: 600;
}
.button {
  border-radius: 0.375rem;
  border: 1px solid;
  box-shadow: 0 0 transparent, 0 0 transparent;
  cursor: pointer;
  display: inline-block;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
  padding: 0.375rem 1rem;
  user-select: none;
  vertical-align: middle;
  white-space: nowrap;
}
.button-danger {
  background-color: hsl(0, 0%, 100%);
  color: var(--error);
}
.button-danger:hover {
  background-color: var(--error);
  color: hsl(0, 0%, 100%);
}
.error {
  color: var(--error);
  font-size: medium;
  font-weight: 400;
}
</style>
