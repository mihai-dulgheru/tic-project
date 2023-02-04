<template>
  <li>
    <div>
      <a :href="emailLink">{{ email }}</a>
    </div>
    <p>{{ message }}</p>
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
  computed: {
    emailLink() {
      return `mailto:${this.email}`;
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
</style>
