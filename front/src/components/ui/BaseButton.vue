<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    mode: {
      type: String,
      required: false,
      default: null,
      validator(value) {
        return ["flat", "outline"].includes(value);
      },
    },
    link: {
      type: Boolean,
      required: false,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "/coaches",
    },
  },
};
</script>

<style scoped>
button,
a {
  background-color: var(--primary);
  border-radius: 1.875rem;
  border: 1px solid var(--primary);
  /* color: #080808; */
  color: white;
  cursor: pointer;
  display: inline-block;
  font: inherit;
  margin-right: 0.5rem;
  padding: 0.75rem 1.5rem;
  text-decoration: none;
}
a:hover,
a:active,
button:hover,
button:active {
  background-color: var(--dark);
  border-color: var(--dark);
  color: white;
}
.flat {
  background-color: transparent;
  border: none;
  color: var(--primary);
}
.outline {
  background-color: transparent;
  border-color: var(--dark);
  color: var(--dark);
}
.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: var(--primary);
  border-color: var(--primary);
  /* color: #080808; */
  color: white;
}
</style>
