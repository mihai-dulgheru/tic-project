<template>
  <teleport to="body">
    <div v-if="show" @click="close" class="backdrop"></div>
    <transition name="dialog">
      <dialog open v-if="show">
        <header>
          <slot name="header">
            <h2>{{ title }}</h2>
          </slot>
        </header>
        <section>
          <slot></slot>
        </section>
        <menu v-if="!fixed">
          <slot name="actions">
            <base-button mode="flat" @click="close">Close</base-button>
          </slot>
        </menu>
      </dialog>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: "ErrorDialog",
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      required: false,
    },
    fixed: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  emits: ["close"],
  methods: {
    close() {
      if (this.fixed) {
        return;
      }
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.backdrop {
  background-color: hsla(0, 0%, 0%, 0.75);
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}
dialog {
  background-color: hsl(0, 0%, 100%);
  border-radius: 0.75rem;
  border: none;
  box-shadow: 0 0.125rem 0.5rem hsla(0, 0%, 0%, 0.25);
  left: 10%;
  margin: 0;
  overflow: hidden;
  padding: 0;
  position: fixed;
  top: 20vh;
  width: 80%;
  z-index: 100;
}
header {
  background-color: var(--error);
  color: hsl(0, 0%, 100%);
  padding: 1rem;
  width: 100%;
}
header h2 {
  margin: 0;
  user-select: none;
}
section {
  padding: 1rem;
}
menu {
  display: flex;
  justify-content: flex-end;
  margin: 0;
  padding: 1rem;
}
@media (min-width: 768px) {
  dialog {
    left: calc(50% - 20rem);
    width: 40rem;
  }
}
.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.dialog-enter-active {
  transition: all 0.3s ease-out;
}
.dialog-leave-active {
  transition: all 0.3s ease-in;
}
.dialog-enter-to,
.dialog-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
