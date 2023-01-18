<template>
  <main>
    <base-dialog
      :show="!!error"
      title="An Error Occurred!"
      @close="handleError"
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
            <div class="form-control">
              <h2>Role</h2>
              <div class="roles">
                <div>
                  <input
                    id="role-admin"
                    name="role"
                    type="radio"
                    v-model="role"
                    value="admin"
                  />
                  <label for="role-admin">Admin</label>
                </div>
                <div>
                  <input
                    id="role-client"
                    name="role"
                    type="radio"
                    v-model="role"
                    value="client"
                  />
                  <label for="role-client">Client</label>
                </div>
              </div>
            </div>
            <div class="actions">
              <base-button>Save</base-button>
            </div>
          </form>
        </div>
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
      isLoading: false,
      error: null,
    };
  },
  computed: {
    ...mapGetters({
      email: "profile/email",
      name: "profile/name",
      role: "profile/role",
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
      this.$store.dispatch("profile/saveProfile", {
        name: this.name,
        email: this.email,
        role: this.role,
      });
    },
    handleError() {
      this.error = null;
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
  border-radius: 12px;
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
.roles {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  column-gap: 0.5rem;
}
.roles div label {
  display: flex;
  align-items: center;
  justify-self: flex-start;
  margin: 0;
}
</style>
