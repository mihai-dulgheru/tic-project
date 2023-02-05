<template>
  <li>
    <div>
      <a :href="emailLink">{{ email }}</a>
    </div>
    <p>{{ message }}</p>
    <button @click="handleDelete">&times;</button>
  </li>
</template>

<script>
export default {
  name: "RequestItem",
  props: {
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  emits: ["delete"],
  computed: {
    emailLink() {
      return `mailto:${this.email}`;
    },
  },
  methods: {
    handleDelete() {
      this.$emit("delete");
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
a {
  color: var(--primary);
  font-weight: 700;
  text-decoration: none;
}
a:hover,
a:active {
  color: var(--secondary);
}
p {
  margin: 0.5rem 0 0 0;
}
button {
  background: transparent;
  border: none;
  color: var(--error);
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 700;
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}
</style>
