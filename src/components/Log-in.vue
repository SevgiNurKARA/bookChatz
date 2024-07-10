<template>
  <div id="login-page">
  <div class="login">
    <form name="login-form" @submit.prevent="submitForm">
        <div class="mb-3">
            <label for="email">E-mail:  </label>
            <input id="email" v-model="form.email" type="email">
        </div>

        <div class="mb-3">
            <label for="password">Password:  </label>
            <input id="password" v-model="form.password" type="password">
        </div>
        <button class="btn" type="submit" v-on:click.prevent="login()">
            Login
        </button>
        <router-link to="/users/register">Create new account</router-link>
        <p v-if="message">{{ message }}</p>          
    </form>
  </div>
</div>   
</template>

<script>

//import axios from 'axios';

export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      message: '',
     
    };
  },
  methods: {
    /*async submitForm() {
      try {
        const response = await axios.post('http://localhost:8080/users/login', this.form);
        this.message = 'Form submitted successfully!' + response.message;
      } catch (error) {
        this.message = 'Error submitting form: ' + error.message;
      }
    },*/
    login() {
      this.$router.push('/');
 /* if (this.form.email && this.form.password) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.form.email)) {
      alert("Geçerli bir e-posta adresi girin.");
      return;
    }
    // Store the values in localStorage
    localStorage.setItem('userEmail', this.form.email);
    localStorage.setItem('userPassword', this.form.password);
    this.submitForm();
  }
  else {
    alert("E-posta ve şifre boş bırakılamaz.");
  } */
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
  height: 100%;
  width: 100%;
  background-image: url('@/assets/bookBackground.jpeg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 650px;
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
}


</style>
