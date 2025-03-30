<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const errorMessage = ref('');

const formData = ref({
  username: '',
  password: '',
  full_name: '',
  qualification: '',
  dob: ''
});

const handleRegister = async () => {
  try {
    const response = await axios.post('http://localhost:5000/register', formData.value);
    if (response.data.message === "User registered successfully!") {
      errorMessage.value = 'Registeration successful! Redirecting to login...';
      router.push('/login');
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.error || "Registration failed. Please try again.";
  }
};
</script>

<template>
  <div class="register-container">
    <h2>Create New Account</h2>
    <form @submit.prevent="handleRegister" class="register-form">
      <div class="form-group">
        <label>Email:</label>
        <input type="email" v-model="formData.username" required />
      </div>
      <div class="form-group">
        <label>Password:</label>
        <input type="password" v-model="formData.password" required />
      </div>
      <div class="form-group">
        <label>Full Name:</label>
        <input type="text" v-model="formData.full_name" required />
      </div>
      <div class="form-group">
        <label>Qualification:</label>
        <input type="text" v-model="formData.qualification" required />
      </div>
      <div class="form-group">
        <label>Date of Birth:</label>
        <input type="date" v-model="formData.dob" required />
      </div>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <button type="submit" >Register</button>
      <router-link to="/login">Already have an account? Login</router-link>
    </form>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  background: white;
}

.register-form {
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
