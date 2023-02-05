<template>
  <div class="password-input">
    <input
      :id="id"
      :type="passwordFieldType"
      :value="password"
      @blur="this.$emit('blur')"
      @input="this.$emit('update:password', $event.target.value)"
    />
    <button @click="switchVisibility" type="button">
      <img :src="src" />
    </button>
  </div>
</template>

<script>
export default {
  name: "PasswordInput",
  props: ["id", "password"],
  emits: ["blur", "update:password"],
  data() {
    return {
      passwordFieldType: "password",
    };
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType =
        this.passwordFieldType === "password" ? "text" : "password";
    },
  },
  computed: {
    src() {
      return this.passwordFieldType === "password"
        ? "/icons/eye-solid.svg"
        : "/icons/eye-slash-solid.svg";
    },
  },
};
</script>

<style scoped>
.password-input {
  display: flex;
  align-items: center;
  position: relative;
}
input {
  border-radius: 0.25rem;
  border: 1px solid var(--light);
  display: block;
  font: inherit;
  padding: 0.5rem;
  padding-right: 2.5rem;
  width: 100%;
}
input:focus {
  background-color: var(--bg-focus);
  border-color: var(--primary);
  outline: none;
}
button {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  width: 2.5rem;
}
img {
  height: 1.25rem;
  width: 1.25rem;
}
</style>
