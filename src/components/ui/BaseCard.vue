<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<style scoped>
.card {
  border-radius: 0.75rem;
  box-shadow: 0 0.125rem 0.5rem hsla(0, 0%, 0%, 0.25);
  margin: 2rem auto;
  max-width: 40rem;
  padding: 1rem;
}
</style>
