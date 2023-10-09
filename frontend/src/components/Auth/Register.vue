<template>
  <div class="register">
    <div class="register-form">
      <h1>Register</h1>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required/>
          <div v-if="v$.name.$error" class="validation-error">{{ v$.name.$errorMessage }}</div>
        </div>
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="email" required/>
          {{ console.log(v$.email) }}
          <div v-if="v$.email.required.$invalid" class="validation-error">{{ v$.email.$errorMessage }}</div>
          <div v-if="v$.email.email.$invalid" class="validation-error">Email must be valid</div>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required/>
          <div v-if="v$.password.$error" class="validation-error">{{ v$.password.$errorMessage }}</div>
        </div>
        <div class="form-group">
          <button type="submit">Register</button>
        </div>
        <div class="validation-error" v-if="error">{{ error }}</div>
        <div class="success" v-if="success">{{ success }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  name: 'Register',
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      error: null,
      success: null,
    };
  },
  validations() {
    return {
      name: {
        required
      },
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    }
  },
  methods: {
    ...mapActions(['register']),
    async handleRegister() {
      try {
        this.error = null;
        this.success = null;
        this.v$.$touch();
        if (this.v$.$invalid) {
          return;
        }
        // Call the login action with the name, email and password
        const response = await this.register({ name: this.name, email: this.email, password: this.password });
        if(response.success) {
          this.success = response.message;
        }
        this.name = '';
        this.email = '';
        this.password = '';
      } catch (error) {
        if(error?.response?.data?.message) {
          this.error = error.response.data.message
        } else {
          this.error = 'An error occurred during register.';
        }
      }
    },
  },
};
</script>

<style scoped>
.validation-error {
  color: #ff0000;
}
.success {
  color: green;
}

.register {
  display: flex;
  justify-content: center;
  align-items: baseline;
  height: 100%;
}

.register-form {
  background-color: #f4f4f4;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 2em;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  /* Dark text color */
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-size: 1.2em;
  color: #333;
  /* Dark text color */
}

input {
  width: 100%;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 3px;
}

button {
  width: 100%;
  padding: 10px 20px;
  font-size: 1.2em;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>
