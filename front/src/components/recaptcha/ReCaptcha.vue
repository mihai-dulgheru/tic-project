<template>
  <vue-recaptcha :sitekey="siteKey"></vue-recaptcha>
</template>

<script>
import { VueRecaptcha } from "vue-recaptcha";

export default {
  name: "ReCaptcha",
  components: {
    VueRecaptcha,
  },
  computed: {
    siteKey() {
      return process.env.VUE_APP_RECAPTCHA_SITE_KEY;
    },
  },
};
</script>
