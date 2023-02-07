<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script>
export default {
  name: "BaseBadge",
  props: {
    type: {
      type: String,
      required: false,
      default: null,
      validator(value) {
        return ["frontend", "backend", "career"].includes(value);
      },
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
  },
  computed: {
    text() {
      return this.title.toUpperCase();
    },
  },
};
</script>

<style scoped>
.badge {
  border-radius: 1.875rem;
  display: inline-block;
  margin-right: 0.5rem;
  padding: 0.5rem 1.5rem;
}
.frontend {
  background-color: var(--bg-frontend);
}
.backend {
  background-color: var(--bg-backend);
}
.career {
  background-color: var(--bg-career);
}
</style>
