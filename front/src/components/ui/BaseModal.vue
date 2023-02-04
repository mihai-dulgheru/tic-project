<template>
  <teleport to="body">
    <transition name="dialog">
      <div class="modal" v-if="show">
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: "BaseModal",
  data: () => ({
    show: false,
  }),
  methods: {
    handleShow() {
      this.show = true;
    },
    handleClose() {
      this.show = false;
    },
  },
};
</script>

<style scoped>
.dialog-enter-active,
.dialog-leave-active {
  transition: opacity 0.3s;
}
.dialog-enter,
.dialog-leave-to {
  opacity: 0;
}
.modal {
  align-items: center;
  background-color: hsla(0, 0%, 0%, 0.75);
  display: flex;
  height: 100vh;
  justify-content: center;
  left: 0;
  padding: 0.5rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 10;
}
.modal-body {
  background-color: hsl(0, 0%, 100%);
  border-radius: 0.75rem;
  border: none;
  box-shadow: 0 0.125rem 0.5rem hsla(0, 0%, 0%, 0.25);
  margin: 0;
  max-width: 40rem;
  overflow: hidden;
  padding: 1rem;
  position: fixed;
  top: 20vh;
  width: 80%;
  z-index: 100;
}
</style>
