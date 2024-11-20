<template>
    <div class="user-container">
      <h2>User Profile</h2>
      <div v-if="user">
        <p><strong>Name:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <button class="edit-button" @click="editProfile">Edit Profile</button>
        <button class="change-password-button" @click="changePassword">Change Password</button>
      </div>
      <div v-if="editing">
        <h3>Edit Profile</h3>
        <form @submit.prevent="updateProfile">
          <div>
            <label for="name">Name:</label>
            <input type="text" v-model="user.name" required>
          </div>
          <div>
            <label for="email">Email:</label>
            <input type="email" v-model="user.email" required>
          </div>
          <button type="submit">Save</button>
          <button type="button" @click="cancelEdit">Cancel</button>
        </form>
      </div>
      <div v-if="changingPassword">
        <h3>Change Password</h3>
        <form @submit.prevent="updatePassword">
          <div>
            <label for="currentPassword">Current Password:</label>
            <input type="password" v-model="currentPassword" required>
          </div>
          <div>
            <label for="newPassword">New Password:</label>
            <input type="password" v-model="newPassword" required>
          </div>
          <div>
            <label for="confirmNewPassword">Confirm New Password:</label>
            <input type="password" v-model="confirmNewPassword" required>
          </div>
          <button type="submit">Save</button>
          <button type="button" @click="cancelChangePassword">Cancel</button>
        </form>
      </div>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        user: null,
        editing: false,
        changingPassword: false,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
        successMessage: '',
        errorMessage: ''
      };
    },
    methods: {
      async fetchUser() {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://localhost:3000/api/user', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.user = response.data;
        } catch (error) {
          this.errorMessage = 'Error fetching user data';
          console.error('Error fetching user data:', error.response.data);
        }
      },
      editProfile() {
        this.editing = true;
      },
      async updateProfile() {
        try {
          const token = localStorage.getItem('token');
          await axios.put('http://localhost:3000/api/user', this.user, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.editing = false;
          this.successMessage = 'Profile updated successfully';
        } catch (error) {
          this.errorMessage = 'Error updating profile';
          console.error('Error updating profile:', error.response.data);
        }
      },
      cancelEdit() {
        this.editing = false;
        this.fetchUser(); // Reset user data to original values
      },
      changePassword() {
        this.changingPassword = true;
      },
      async updatePassword() {
        if (this.newPassword !== this.confirmNewPassword) {
          this.errorMessage = 'New passwords do not match';
          return;
        }
        try {
          const token = localStorage.getItem('token');
          await axios.put('http://localhost:3000/api/user/change-password', {
            currentPassword: this.currentPassword,
            newPassword: this.newPassword
          }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          this.changingPassword = false;
          this.currentPassword = '';
          this.newPassword = '';
          this.confirmNewPassword = '';
          this.successMessage = 'Password changed successfully';
        } catch (error) {
          this.errorMessage = 'Error changing password';
          console.error('Error changing password:', error.response.data);
        }
      },
      cancelChangePassword() {
        this.changingPassword = false;
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmNewPassword = '';
      }
    },
    created() {
      this.fetchUser();
    }
  };
  </script>
  
  <style scoped>
  .user-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .user-container h2 {
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
  }
  
  .user-container p {
    margin-bottom: 10px;
    font-size: 18px;
  }
  
  .edit-button,
  .change-password-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    margin-right: 10px;
  }
  
  .edit-button:hover,
  .change-password-button:hover {
    background-color: #0056b3;
  }
  
  form div {
    margin-bottom: 10px;
  }
  
  form label {
    display: block;
    margin-bottom: 5px;
  }
  
  form input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  form button {
    margin-right: 10px;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  form button[type="submit"] {
    background-color: #28a745;
    color: #fff;
  }
  
  form button[type="submit"]:hover {
    background-color: #218838;
  }
  
  form button[type="button"] {
    background-color: #dc3545;
    color: #fff;
  }
  
  form button[type="button"]:hover {
    background-color: #c82333;
  }
  
  .success-message {
    color: green;
    margin-top: 10px;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
  </style>
  