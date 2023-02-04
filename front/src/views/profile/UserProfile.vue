<template>
  <main>
    <base-dialog :show="!!success" @close="handleSuccess" title="Success!">
      <p>{{ success }}</p>
    </base-dialog>
    <base-dialog
      :show="!!error"
      @close="handleError"
      title="An Error Occurred!"
    >
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <base-card>
        <header>
          <h2>User's Profile</h2>
        </header>
        <div>
          <form @submit.prevent="submitForm">
            <div class="form-control">
              <label for="name">Name</label>
              <input type="text" id="name" v-model.trim="name" />
            </div>
            <div class="form-control">
              <label for="email">Email</label>
              <input type="email" id="email" v-model.trim="email" />
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
                id="password"
                v-model:password="password"
              ></password-input>
            </div>
            <div class="form-control">
              <label for="confirmPassword">Confirm Password</label>
              <password-input
                id="confirmPassword"
                v-model:password="confirmPassword"
              ></password-input>
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
      confirmPassword: null,
      email: null,
      error: null,
      isLoading: false,
      name: null,
      password: null,
      success: null,
    };
  },
  async created() {
    await this.loadProfile();
    this.name = this.$store.getters["profile/name"];
    this.email = this.$store.getters["profile/email"];
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
    async submitForm() {
      try {
        await this.$store.dispatch("profile/saveProfile", {
          name: this.name,
          email: this.email,
        });
        this.success = "Profile saved successfully!";
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
    },
    async submitPasswordForm() {
      try {
        await this.$store.dispatch("profile/changePassword", {
          password: this.password,
          confirmPassword: this.confirmPassword,
        });
        this.success = "Password changed successfully!";
        this.password = null;
        this.confirmPassword = null;
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
  },
};
</script>

<style scoped>
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
</style>
