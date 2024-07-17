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
          <button @click="confirmDeleteAccount" class="delete-account-btn">Delete Account</button>
        </div>
      </div>
      <div class="user-posts">
        <h2>My Posts ({{ userPosts.length }})</h2>
        <div v-if="userPosts.length === 0">You haven't created any posts yet.</div>
        <div v-else class="post-list">
        <div v-for="(post, index) in userPosts" :key="post.postId || index" class="post-item">
            <h3>{{ index + 1 }}. {{ post.bookTitle }}</h3>
            <p><strong>Author:</strong> {{ post.bookAuthorName }}</p>
            <p><strong>Type:</strong> {{ post.bookType }}</p>
            <img v-if="post.bookPhotoUrl" :src="post.bookPhotoUrl" alt="Book Cover" class="book-cover">
            <p><strong>Review:</strong> {{ post.review }}</p>
            <button @click="editPost(post.postId)">Edit</button>
            <button @click="deletePost(post.postId)">Delete</button>
        </div>
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
      userPosts: [] ,
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
  this.$nextTick(async () => {
    await this.loadUserPosts();
    console.log('After loading, userPosts:', JSON.stringify(this.userPosts, null, 2));
  });
},

  methods: {
    async loadUserPosts() {
  try {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID is missing');
      return;
    }
    const response = await axios.get(`http://localhost:8000/posts/users/${userId}`);
    
    this.userPosts=response.data;
    
    console.log('Number of posts:', this.userPosts.length);
  } catch (error) {
    console.error('Error loading user posts:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
    }
  }
},
    loadUserData() {
      this.user.id = localStorage.getItem('userId') || '';
      this.user.fullname = localStorage.getItem('fullname') || '';
      this.user.email = localStorage.getItem('email') || '';
      this.user.photoUrl = localStorage.getItem('photoUrl') || '';
    },
    selectAvatar(avatarSrc) {
      this.selectedAvatar = avatarSrc;
      this.showAvatarSelection = false;
    },
    updateProfile() {
      // Update user data in localStorage
      localStorage.setItem('fullname', this.user.fullname);
      localStorage.setItem('email', this.user.email);
      localStorage.setItem('photoUrl', this.selectedAvatar || this.user.photoUrl);

      if (this.user.password) {
        localStorage.setItem('userPassword', this.user.password);
      }
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
          this.$router.push('/landing');
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
    },
    editPost(postId) {
    this.$router.push({ name: 'PostEdit', params: { id: postId } });
  },
    async deletePost(postId) {
      if (confirm('Are you sure you want to delete this post?')) {
        try {
          await axios.delete(`http://localhost:8000/posts/delete/${postId}`);
          this.userPosts = this.userPosts.filter(post => post.id !== postId);
        } catch (error) {
          console.error('Error deleting post:', error);
          alert('An error occurred while deleting the post.');
        }
      }
    }
  }
};
</script>

<style scoped>
.whole-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 1rem;
  background-color: #6F4E37;
  min-height: 100vh;
}

.profile-page {
  display: flex;
  flex-direction: row-reverse; /* This will move the profile to the right */
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #A67B5B;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.left-section {
  flex: 3;
  padding-right: 20px;
}

.right-section {
  flex: 1;
  padding-left: 20px;
  border-left: 1px solid #ddd;
}

/* User profile styles */
.user-details {
  margin-bottom: 20px;
}

.avatar-section {
  text-align: center;
  margin-bottom: 20px;
}

.current-avatar {
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 15px;
  border: 3px solid #ddd;
}

/* Form styles */
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #131212;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
}

button:hover {
  background-color: #45a049;
}

.delete-account-btn {
  background-color: #ff4d4d;
}

.delete-account-btn:hover {
  background-color: #ff1a1a;
}
.user-posts {
  flex: 3;
  padding-right: 20px;
}

.post-list {
  display: grid;
  width: 100%;
  max-width: 800px;
  gap: 20px;
  width: 100%;
}

.post-item {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
}

.book-cover {
  width: 100px;
  height: 150px;
  margin-bottom: 10px;
  border-radius: 5px;
  object-fit: cover;
  margin-right: 20px;
}

.post-item h3 {
  margin-top: 0;
  margin-bottom: 10px;
}

.post-item p {
  margin-bottom: 10px;
}

.post-item button {
  margin-top: 8px;
  padding: 5px 10px;
  font-size: 12px;
}

.post-item button:first-of-type {
  margin-right: 5px;
  background-color: #4CAF50;
}

.post-item button:last-of-type {
  background-color: #f44336;
}
</style>