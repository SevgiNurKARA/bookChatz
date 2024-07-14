<template>
  <div id="register-page">
    <div class="register">
      <form name="register-form" @submit.prevent="submitForm">
        <div class="reg">
          <label for="email">E-mail: </label>
          <input id="email" type="email" v-model="form.email" required />
        </div>

        <div class="reg">
          <label for="password">Password: </label>
          <input id="password" v-model="form.password" type="password" required />
        </div>
        
        <div class="reg">
          <label for="fullname">Full Name: </label>
          <input id="fullname" v-model="form.fullname" type="text" required />
        </div>
        
        <div class="reg">
          <label>Select your avatar: </label>
          <div class="avatar-options">
            <div v-for="(avatar, index) in avatars" :key="index" class="avatar" @click="selectAvatar(index)">
              <img :src="avatar.src" :alt="avatar.alt" />
            </div>
          </div>
          <div v-if="selectedAvatar" class="selected-avatar">
            <p>Selected Avatar:</p>
            <img :src="selectedAvatar.src" :alt="selectedAvatar.alt" />
          </div>
        </div>
        
        <button class="btn" type="submit" >
          Register
        </button>
      </form>
    </div>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      avatars: [
        { src: 'https://t3.ftcdn.net/jpg/02/81/81/42/240_F_281814220_xSqihBCVEluoKEjWLH8iq9sYPs1A3ojr.jpg', alt: 'Avatar 1' },
        { src: 'https://t4.ftcdn.net/jpg/03/25/30/09/240_F_325300900_ZrBgMXBB4d0znXaut99id8sAtXtDU7ht.jpg', alt: 'Avatar 2' },
        { src: 'https://t3.ftcdn.net/jpg/02/95/46/68/240_F_295466808_npU0rjNVfQ6X3DFnVijP4YCs78gft1jX.jpg', alt: 'Avatar 3' }
      ],
      selectedAvatar: null,
      form: {
        fullname: '',
        email: '',
        password: '',
        photoUrl: ''
      },
      message: ''
    };
  },

  methods: {
     
  selectAvatar(index) {
    this.selectedAvatar = this.avatars[index];
    let sourceUrl = this.avatars[index].src;
    localStorage.setItem('userAvatar', sourceUrl);
    this.form.photoUrl = sourceUrl;
  },
  
  register() {
  if (!this.form.email || !this.form.password || !this.form.fullname || !this.selectedAvatar) {
    this.message = "All fields are required.";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.form.email)) {
    this.message = "Please enter a valid email address.";
    return;
  }

  if (this.form.password.length < 8) {
    this.message = "Password must be at least 8 characters long.";
    return;
  }

  // Here you would typically make an API call to register the user
  // For now, we'll just simulate success
  this.message = "Registration successful!";
  setTimeout(() => {
    this.$router.push('/');
  }, 2000);
},
async submitForm() {
      if (!this.form.email || !this.form.password || !this.form.fullname || !this.selectedAvatar) {
        this.message = "All fields are required.";
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.form.email)) {
        this.message = "Please enter a valid email address.";
        return;
      }

      if (this.form.password.length < 8) {
        this.message = "Password must be at least 8 characters long.";
        return;
      }

      try {
    const response = await axios.post('http://localhost:8000/users/register', this.form);
    this.message = 'Registration successful! ' + response.data.message;
    
    // Kullanıcı bilgilerini localStorage'a kaydet
    localStorage.setItem('userEmail', this.form.email);
    localStorage.setItem('fullname', this.form.fullname);
    localStorage.setItem('userAvatar', this.form.photoUrl);
    
    // Kısa bir gecikme sonrası ana sayfaya yönlendir
    setTimeout(() => {
      this.$router.push('/');
    }, 2000);
  } catch (error) {
    if (error.response) {
      switch(error.response.status) {
        case 409:
          this.message = "This email is already registered. Please use a different email.";
          break;
        case 400:
          this.message = "Invalid data submitted. Please check your inputs.";
          break;
        default:
          this.message = 'Registration failed: ' + (error.response.data.message || 'Unknown error');
      }
    } else if (error.request) {
      this.message = 'No response received from the server. Please try again later.';
    } else {
      this.message = 'Error submitting form: ' + error.message;
    }
  }
    },
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

#register-page {
  height: 100%;
  width: 100%;
  background-image: url('@/assets/bookBackground.jpeg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.register {
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

input[type="email"], input[type="password"], input[type="text"] {
  height: 40px;
  padding: 0 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.8);
  color: rgb(24, 22, 18);
  border: none;
  border-radius: 20px;
  line-height: 40px;
}

.avatar-options {
  display: flex;
  gap: 10px;
}

.avatar {
  cursor: pointer;
}

.avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: border-color 0.3s;
  border: 2px solid transparent;
}

.avatar img:hover {
  border-color: #007BFF;
}

.selected-avatar {
  margin-top: 10px;
  text-align: center;
}

.selected-avatar img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 3px solid #007BFF;
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
