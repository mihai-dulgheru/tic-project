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
          <h2>User's profile</h2>
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
          <h2>Change password</h2>
        </header>
        <div>
          <form @submit.prevent="submitPasswordForm">
            <div class="form-control">
              <label for="password">Password</label>
              <input type="password" id="password" v-model.trim="password" />
            </div>
            <div class="form-control">
              <label for="confirmPassword">Confirm password</label>
              <input
                type="password"
                id="confirmPassword"
                v-model.trim="confirmPassword"
              />
            </div>
            <div class="actions">
              <base-button>Change password</base-button>
            </div>
          </form>
        </div>
      </base-card>
    </section>

    <section>
      <base-card>
        <div class="subhead subhead--spacious">
          <h2 class="subhead-heading subhead-heading--danger">
            Delete account
          </h2>
        </div>
        <p>
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <button class="button button-danger">Delete your account</button>
      </base-card>
    </section>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UserProfile",
  data() {
    return {
      error: null,
      isLoading: false,
      success: null,
    };
  },
  computed: {
    ...mapGetters({
      email: "profile/email",
      name: "profile/name",
    }),
  },
  created() {
    this.loadProfile();
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
        this.$store.dispatch("profile/saveProfile", {
          name: this.name,
          email: this.email,
        });
        this.success = "Profile saved successfully!";
      } catch (error) {
        this.error = error.message || "Something went wrong!";
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
  margin: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 0.5rem;
}
.form-control {
  margin: 0.5rem 0;
}
.form-control div {
  display: flex;
  align-items: center;
  justify-self: flex-start;
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
.subhead {
  border-bottom: 1px solid #e1e4e8;
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
  color: #f85149;
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
  background-color: #ffffff;
  color: #f85149;
}
.button-danger:hover {
  background-color: #f85149;
  color: #ffffff;
}
</style>
