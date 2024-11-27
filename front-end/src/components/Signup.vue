<template>
  <div class="signup-container">
    <h2>Signup</h2>
    <form @submit.prevent="signup">
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" required>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required>
      </div>
      <button type="submit">Signup</button>
    </form>
    <button class="back-button" @click="goToLogin">Back to Login</button>
    <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      successMessage: ''
    };
  },
  methods: {
    async signup() {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/signup', {
          name: this.name,
          email: this.email,
          password: this.password,
          role: 'user' // Mặc định vai trò là 'user'
        });
        this.successMessage = 'Signup successful!';
        console.log('User created successfully:', response.data);
      } catch (error) {
        console.error('Error signing up:', error.response.data);
      }
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.signup-container h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.signup-container input[type="text"],
.signup-container input[type="email"],
.signup-container input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.signup-container button {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.signup-container button:hover {
  background-color: #218838;
}

.signup-container .back-button {
  margin-top: 10px;
  background-color: #007bff;
}

.signup-container .back-button:hover {
  background-color: #0056b3;
}

.success-message {
  color: green;
  margin-top: 10px;
}
</style>
