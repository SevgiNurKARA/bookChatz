<template>
  <div id="login-page">
    <div class="login">
      <form name="login-form" @submit.prevent="login">
        <div class="mb-3">
          <label for="email">E-mail: </label>
          <input id="email" v-model="form.email" type="email" required> 
        </div>

        <div class="mb-3">
          <label for="password">Password: </label>
          <input id="password" v-model="form.password" type="password" required>
        </div>
        <button class="btn" type="submit" :disabled="isLoading">
          {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
        <router-link to="/users/register" style="color: white;">Create new account</router-link>        
      </form>
    </div>
    <transition name="fade">
      <div v-if="message" class="alert" :class="{ 'alert-success': isSuccess, 'alert-error': !isSuccess }">
        {{ message }}
      </div>
    </transition>
  </div>   
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isSuccess: false,
      form: {
        email: '',
        password: ''
      },
      message: '',
      isLoading: false,
      isError: false
    };
  },
  methods: {
    async login() {
  this.isLoading = true;
  this.message = '';
 

  console.log('Attempting login with:', this.form);

  try {
    const response = await axios.post('http://localhost:8000/users/login', this.form);
    this.message = 'Login is successful! ' + response.data.message;
    this.isSuccess = true;    

    if (response.data && response.data.userId) {
      // Token yerine userId'yi kontrol ediyoruz
      localStorage.setItem('userId', response.data.userId);
      localStorage.setItem('fullname', response.data.fullname);
      localStorage.setItem('photoUrl', response.data.photoUrl);
      localStorage.setItem('email', response.data.email);
      
      this.message = 'Login successful!';
      console.log('Login successful, user data received');
      setTimeout(() => this.$router.push('/'), 1500);
    } else {
      this.isSuccess = false;
      this.message = 'Login failed: User data not received';
      console.error('Login response does not contain user data:', response.data);
    }
  } catch (error) {
    this.isSuccess = false;
    console.error('Login error:', error);
    
    if (error.response) {
      console.error('Error response:', error.response);
      this.message = `Login failed: ${error.response.data.message || 'Invalid credentials'}`;
    } else if (error.request) {
      console.error('Error request:', error.request);
      this.message = 'Login failed: No response from server. Please try again.';
    } else {
      this.message = `Login failed: ${error.message}`;
    }
  } finally {
    this.isLoading = false;
  }
}
  }
};
</script>


<style>
body, html {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
  }
  
  #login-page {
    height: 718px;
    width: 100%;
    background-image: url('@/assets/bookBackground.jpeg');
    background-size: cover;
    background-position: center;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .login {
    width: 400px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    border: 1px solid rgb(5, 5, 5);
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.75);
    overflow: hidden;
    
  }
  
  form {
    box-sizing: border-box;
    width: 100%;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  label {
    color: rgba(255, 255, 255, 0.8);
    text-transform: uppercase;
    font-size: 10px;
    letter-spacing: 2px;
    padding-left: 10px;
  }
  
  input {
    height: 40px;
    padding: 0 20px;
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 0.8);
    color: rgb(24, 22, 18);
    border: none;
    border-radius: 20px;
    line-height: 40px;
  }
 
  .alert {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  max-width: 80%;
  text-align: center;
}

.alert-success {
  background-color: #4CAF50;
  color: white;
}

.alert-error {
  background-color: #f44336;
  color: white;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px) translateX(-50%);
}


  .btn {
    height: 40px;
    margin: 10px 0;
    background: rgb(45, 126, 231);
    color: white;
    text-transform: uppercase;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 40px;
    line-height: 40px;
    cursor: pointer;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    padding: 1px;
  }
  

</style>
