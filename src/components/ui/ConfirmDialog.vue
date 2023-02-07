<template>
  <base-modal ref="modal">
    <header>
      <div class="icon-box">
        <i class="fa-regular fa-circle-xmark w-full h-full"></i>
      </div>
      <h2 class="modal-title">{{ title }}</h2>
      <button class="close-button-times" @click="handleClose">&times;</button>
    </header>
    <main class="modal-body">
      <p>{{ message }}</p>
    </main>
    <footer class="modal-footer">
      <div class="buttons">
        <button class="close-button" @click="handleClose">
          {{ closeButton }}
        </button>
        <button class="save-button" @click="handleSave">
          {{ saveButton }}
        </button>
      </div>
    </footer>
  </base-modal>
</template>

<script>
import BaseModal from "./BaseModal.vue";

export default {
  name: "ConfirmDialog",
  components: {
    BaseModal,
  },
  data: () => ({
    closeButton: null,
    message: null,
    rejectPromise: null,
    resolvePromise: null,
    saveButton: null,
    title: null,
  }),
  methods: {
    handleShow(options = {}) {
      this.closeButton = options.closeButton;
      this.message = options.message;
      this.saveButton = options.saveButton;
      this.title = options.title;
      this.$refs.modal.handleShow();
      return new Promise((resolve, reject) => {
        this.rejectPromise = reject;
        this.resolvePromise = resolve;
      });
    },
    handleSave() {
      this.$refs.modal.handleClose();
      this.resolvePromise(true);
    },
    handleClose() {
      this.$refs.modal.handleClose();
      this.resolvePromise(false);
    },
  },
};
</script>

<style scoped>
header {
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  row-gap: 0.5rem;
}
.icon-box {
  align-items: center;
  color: var(--error);
  display: flex;
  height: 5rem;
  justify-content: center;
  width: 5rem;
}
.modal-title {
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  text-align: center;
  width: 100%;
}
.close-button-times {
  background-color: transparent;
  border: none;
  color: hsl(0, 0%, 18%);
  cursor: pointer;
  font-size: 1.75rem;
  padding: 0;
  position: absolute;
  right: -0.5rem;
  top: -0.5rem;
  width: 2rem;
}
.modal-body {
  align-items: center;
  display: flex;
  justify-content: center;
  padding: 1rem 0;
}
.modal-body p {
  color: hsl(0, 0%, 18%);
  font-size: 1rem;
  font-weight: 400;
  margin: 0;
  text-align: justify;
}
.modal-footer {
  align-items: center;
  display: flex;
  justify-content: flex-end;
}
.buttons {
  column-gap: 1rem;
  display: flex;
}
.buttons button {
  border-radius: 0.375rem;
  border: none;
  color: hsl(0, 0%, 100%);
  cursor: pointer;
  font-size: 1rem;
  font-weight: 400;
  line-height: 2.5rem;
  opacity: 0.8;
  padding: 0 1.5rem;
  text-transform: capitalize;
}
.buttons button:hover {
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}
.save-button {
  background-color: var(--error);
}
.close-button {
  background-color: hsl(0, 0%, 44%);
}
</style>
