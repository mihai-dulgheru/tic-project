<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        v-model.trim="firstName.value"
        @blur="clearValidity('firstName')"
      />
      <p v-if="!firstName.isValid">First Name must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        v-model.trim="lastName.value"
        @blur="clearValidity('lastName')"
      />
      <p v-if="!lastName.isValid">Last Name must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea
        id="description"
        rows="5"
        v-model.trim="description.value"
        @blur="clearValidity('description')"
      ></textarea>
      <p v-if="!description.isValid">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !hourlyRate.isValid }">
      <label for="hourlyRate">Hourly Rate</label>
      <input
        type="number"
        id="hourlyRate"
        v-model.number="hourlyRate.value"
        @blur="clearValidity('hourlyRate')"
      />
      <p v-if="!hourlyRate.isValid">Hourly Rate must be greater than 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Area of Expertise</h3>
      <div>
        <input
          type="checkbox"
          name="frontend"
          id="frontend"
          value="frontend"
          v-model="areas.value"
          @blur="clearValidity('areas')"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="backend"
          id="backend"
          value="backend"
          v-model="areas.value"
          @blur="clearValidity('areas')"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="career"
          id="career"
          value="career"
          v-model="areas.value"
          @blur="clearValidity('areas')"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!areas.isValid">At least one expertise must be selected.</p>
    </div>
    <p v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  name: "CoachForm",
  emits: ["save-data"],
  data() {
    return {
      firstName: {
        value: "",
        isValid: true,
      },
      lastName: {
        value: "",
        isValid: true,
      },
      description: {
        value: "",
        isValid: true,
      },
      hourlyRate: {
        value: null,
        isValid: true,
      },
      areas: {
        value: [],
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.firstName.isValid = !!this.firstName.value;
      this.lastName.isValid = !!this.lastName.value;
      this.description.isValid = !!this.description.value;
      this.hourlyRate.isValid =
        !!this.hourlyRate.value && this.hourlyRate.value >= 0;
      this.areas.isValid = this.areas.value.length > 0;

      this.formIsValid =
        this.firstName.isValid &&
        this.lastName.isValid &&
        this.description.isValid &&
        this.hourlyRate.isValid &&
        this.areas.isValid;
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const formData = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        description: this.description.value,
        hourlyRate: this.hourlyRate.value,
        areas: this.areas.value,
      };

      this.$emit("save-data", formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
input[type="checkbox"] + label {
  display: inline;
  font-weight: normal;
  margin: 0 0 0 0.5rem;
}
input,
textarea {
  border: 1px solid var(--light);
  display: block;
  font: inherit;
  width: 100%;
}
input:focus,
textarea:focus {
  background-color: var(--bg-focus);
  border-color: var(--primary);
  outline: none;
}
input[type="checkbox"] {
  border: none;
  display: inline;
  width: auto;
}
input[type="checkbox"]:focus {
  outline: var(--primary) solid 1px;
}
h3 {
  font-size: 1rem;
  margin: 0.5rem 0;
}
.invalid label {
  color: red;
}
.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
