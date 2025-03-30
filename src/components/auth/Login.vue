<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';
import axios from 'axios';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:5000/login', {
      username: email.value,
      password: password.value,
    });
    
    if (response.data.message === "Login successful") {
      await authStore.login(email.value, password.value);
      router.push(email.value.includes('admin') ? '/admin' : '/dashboard');
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.error || "Login failed. Please check your credentials.";
  }
};
</script>

<template>
  <div class="login-container">
    <h2>Login to Quiz Master</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit">Login</button>
      <router-link to="/register">Create new account</router-link>
    </form>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: white;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background: #1a73e8;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #1557b0;
}

.error-message {
  color: red;
  font-size: 0.9rem;
}

a {
  text-align: center;
  color: #1a73e8;
  text-decoration: none;
}
</style>
