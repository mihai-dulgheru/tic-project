<template>
  <li>
    <div class="header">
      <h3>{{ coach.firstName }} {{ coach.lastName }}</h3>
      <h4>{{ coach.email }}</h4>
    </div>
    <p>{{ message }}</p>
    <div class="actions">
      <button @click="handleEdit" class="button-edit">
        <i class="fa-solid fa-edit"></i>
      </button>
      <button @click="handleDelete" class="button-delete">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "MessageItem",
  props: {
    coach: {
      email: {
        type: String,
        required: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    message: {
      type: String,
      required: true,
    },
  },
  emits: ["delete", "edit"],
  methods: {
    handleDelete() {
      this.$emit("delete");
    },
    handleEdit() {
      this.$emit("edit");
    },
  },
};
</script>

<style scoped>
li {
  border-radius: 0.25rem;
  border: 1px solid var(--light);
  margin: 1rem 0;
  padding: 1rem;
  position: relative;
}
.header {
  align-items: center;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
}
h3 {
  color: var(--primary);
  font-weight: 600;
  margin: 0;
}
h4 {
  color: var(--secondary);
  font-weight: 500;
  margin: 0;
}
p {
  margin: 1rem 0 0 0;
}
.actions {
  align-items: center;
  display: flex;
  position: absolute;
  right: 1rem;
  top: 0.875rem;
}
button {
  align-items: center;
  background: transparent;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  font-size: medium;
  height: 1.5rem;
  justify-content: center;
  width: 1.5rem;
}
.button-edit {
  color: var(--dark);
}
.button-edit:hover {
  background: hsla(197, 37%, 24%, 0.1);
}
.button-delete {
  color: var(--error);
}
.button-delete:hover {
  background: hsla(0, 53%, 51%, 0.1);
}
</style>
