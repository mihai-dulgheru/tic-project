<template>
  <main>
    <section>
      <base-card>
        <h1 class="center">Edit Message</h1>
        <div class="coach-info">
          <div class="center image">
            <i class="fas fa-user-circle"></i>
          </div>
          <p>{{ coach.firstName }} {{ coach.lastName }}</p>
          <div class="center image">
            <i class="fas fa-envelope"></i>
          </div>
          <p>{{ coach.email }}</p>
        </div>
        <form @submit.prevent="submitForm">
          <div class="form-control">
            <label for="email">Your E-Mail</label>
            <input
              :value="email"
              class="disabled"
              disabled
              id="email"
              type="email"
            />
          </div>
          <div class="form-control">
            <label for="message">Message</label>
            <textarea id="message" rows="5" v-model.trim="message"></textarea>
          </div>
          <p class="errors" v-if="!formIsValid">
            Please enter a valid message.
          </p>
          <div class="actions">
            <base-button>Save</base-button>
          </div>
        </form>
      </base-card>
    </section>
  </main>
</template>

<script>
export default {
  name: "MessagesEdit",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      coach: {},
      email: "",
      formIsValid: true,
      message: "",
    };
  },
  methods: {
    async getMessage(id) {
      const message = await this.$store.dispatch("messages/loadMessage", {
        id,
      });
      this.coach = message?.coach || {};
      this.email = message?.email || "";
      this.message = message?.message || "";
    },
    submitForm() {
      this.formIsValid = true;
      if (this.message === "") {
        this.formIsValid = false;
        return;
      }
      this.$store.dispatch("messages/updateMessage", {
        message: this.message,
        messageId: this.id,
      });
      this.$router.replace("/messages");
    },
  },
  created() {
    this.getMessage(this.id);
  },
};
</script>

<style scoped>
.coach-info,
form {
  border-radius: 0.75rem;
  border: 1px solid var(--light);
  margin: 1rem;
  padding: 1rem;
}
.coach-info {
  align-items: center;
  display: grid;
  grid-template-columns: minmax(1rem, 1fr) minmax(10rem, 15fr);
}
.coach-info .image {
  color: var(--dark);
  font-size: 1.125rem;
}
.coach-info p {
  font-size: medium;
  font-weight: 500;
  margin: 0;
  padding: 0.5rem;
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
.errors {
  color: var(--error);
  font-weight: 700;
}
.actions {
  text-align: center;
}
</style>
