<template>
  <div class="login">
    <div class="login-form">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="email" required />
          <div v-if="v$.email.$error" class="validation-error">Invalid email address</div>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required />
          <div v-if="v$.password.$error" class="validation-error">Password is required</div>
        </div>
        <div class="form-group">
          <button type="submit">Login</button>
        </div>
        <div class="validation-error" v-if="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

export default {
  name: 'Login',
  setup () {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  validations() {
    return {
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
    ...mapActions(['login']),
    async handleLogin() {
      try {
        this.error = null;
        this.success = null;
        this.v$.$touch();
        if (this.v$.$invalid) {
          return; // Do not proceed if form is invalid
        }
        // Call the login action with the username and password
        const response = await this.login({ email: this.email, password: this.password });
        this.email = '';
        this.error = '';
        if(response.success) {
          this.success = response.message;
          // If login is successful, you can perform additional actions, such as redirecting to a different page.
          this.$router.push('/dashboard');
        }
      } catch (error) {
        // Handle login errors here
        if(error?.response?.data?.message) {
          this.error = error.response.data.message
        } else {
          this.error = 'An error occurred during login.';
        }
      }
    },
  },
};
</script>

<style scoped>
.validation-error {
  color: #ff0000;
  /* Red color for validation errors */
}

.login {
  display: flex;
  justify-content: center;
  align-items: baseline;
}

.login-form {
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
}</style>
