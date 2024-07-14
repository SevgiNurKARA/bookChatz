<template>
  <div class="whole-page">
    <div class="profile-page">
      <h1>User Profile</h1>
      <div class="profile-content">
        <div class="avatar-section">
          <img :src="selectedAvatar || user.photoUrl" alt="User Avatar" class="current-avatar">
          <button @click="showAvatarSelection = !showAvatarSelection">Change Avatar</button>
          <div v-if="showAvatarSelection" class="avatar-selection">
            <div v-for="(photoUrl, index) in avatars" :key="index" class="avatar-option" @click="selectAvatar(photoUrl.src)">
              <img :src="photoUrl.src" :alt="photoUrl.alt">
            </div>
          </div>
        </div>
        <div class="user-details">
          <form @submit.prevent="updateProfile">
            <div class="form-group">
              <label for="fullname">Full Name:</label>
              <input id="fullname" v-model="user.fullname" type="text" required>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input id="email" v-model="user.email" type="email" required>
            </div>
            <div class="form-group">
              <label for="password">New Password:</label>
              <input id="password" v-model="user.password" type="password">
            </div>
            <button type="submit">Update Profile</button>
          </form>
          <!-- Hesap silme butonu -->
          <button @click="confirmDeleteAccount" class="delete-account-btn">Delete Account</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProfilePage',
  data() {
    return {
      user: {
        id: '',
        fullname: '',
        email: '',
        photoUrl: '',
        password: ''
      },
      showAvatarSelection: false,
      selectedAvatar: '',
      avatars: [
        { src: 'https://t3.ftcdn.net/jpg/02/81/81/42/240_F_281814220_xSqihBCVEluoKEjWLH8iq9sYPs1A3ojr.jpg', alt: 'Avatar 1' },
        { src: 'https://t4.ftcdn.net/jpg/03/25/30/09/240_F_325300900_ZrBgMXBB4d0znXaut99id8sAtXtDU7ht.jpg', alt: 'Avatar 2' },
        { src: 'https://t3.ftcdn.net/jpg/02/95/46/68/240_F_295466808_npU0rjNVfQ6X3DFnVijP4YCs78gft1jX.jpg', alt: 'Avatar 3' }
      ]
    };
  },
  created() {
    this.loadUserData();
  },
  methods: {
    loadUserData() {
      this.user.id = localStorage.getItem('userId') || '';
      this.user.fullname = localStorage.getItem('fullname') || '';
      this.user.email = localStorage.getItem('userEmail') || '';
      this.user.photoUrl = localStorage.getItem('userAvatar') || '';
    },
    selectAvatar(avatarSrc) {
      this.selectedAvatar = avatarSrc;
      this.showAvatarSelection = false;
    },
    updateProfile() {
      // Update user data in localStorage
      localStorage.setItem('fullname', this.user.fullname);
      localStorage.setItem('userEmail', this.user.email);
      localStorage.setItem('userAvatar', this.selectedAvatar || this.user.photoUrl);

      if (this.user.password) {
        localStorage.setItem('userPassword', this.user.password);
      }

      // In a real application, you would send this data to a server
      // axios.post('/api/update-profile', this.user)
      //   .then(response => {
      //     // Handle success
      //   })
      //   .catch(error => {
      //     // Handle error
      //   });

      alert('Profile updated successfully!');
      this.$router.push('/'); // Redirect to home page after update
    },
    confirmDeleteAccount() {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        this.deleteAccount();
      }
    },
    async deleteAccount() {
      try {
        const response = await axios.delete(`http://localhost:8000/users/delete/${this.user.id}`);
        if (response.data === "User was deleted successfully") {
          alert('Your account has been successfully deleted.');
          // Kullanıcı oturumunu sonlandır ve local storage'ı temizle
          localStorage.clear();
          // Ana sayfaya yönlendir
          this.$router.push('/');
        } else {
          alert('An error occurred while deleting your account. Please try again.');
        }
      } catch (error) {
        if (error.response && error.response.data === `User not found with id: ${this.user.id}`) {
          alert('User not found. Please check your account details.');
        } else {
          alert('An error occurred while deleting your account. Please try again.');
        }
        console.error('Error deleting account:', error);
      }
    }
  }
};
</script>

<style scoped>
.whole-page{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #6F4E37;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
.profile-page {
  width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #A67B5B;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.profile-page h1 {
  text-align: center;
  color: #070707;
  margin-bottom: 20px;
}

.profile-content {
  display: flex;
  gap: 30px;
}

.avatar-section {
  flex: 1;
  text-align: center;
}

.current-avatar {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 3px solid #ddd;
}

.avatar-selection {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
  justify-content: center;
}

.avatar-option img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
}

.avatar-option img:hover {
  border-color: #4CAF50;
}

.user-details {
  flex: 2;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #131212;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}
.delete-account-btn {
  margin-top: 20px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-account-btn:hover {
  background-color: #ff1a1a;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #45a049;
}
</style>
