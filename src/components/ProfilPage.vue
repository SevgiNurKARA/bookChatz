<template>
  <div class="whole-page">
    <div class="profile-page">
      <div class="profile-content">
        <h1>User Profile</h1>
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
            <p :class="{ 'collapsed': !post.showFullReview && post.review.length > 300 }">
            {{ post.showFullReview || post.review.length <= 300 ? post.review : post.review.slice(0, 300) + '...' }}
          </p>
          <span class="read-more-btn" v-if="post.review.length > 300" @click="toggleReview(post)" >
            {{ post.showFullReview ? 'Show less' : 'Show more' }}
          </span>
            <button @click="editPost(post.postId)">Edit</button>
            <button @click="deletePost(post.postId)">Delete</button>
        </div>
        </div>
      </div>      
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
  name: 'ProfilePage',
  data() {
    return {
      userPosts: [] ,
      message: '',
    isSuccess: false,
      user: {
        userId: localStorage.getItem('userId'),
        fullname: '',
        email: '',
        photoUrl: '',
        password: localStorage.getItem('password'),
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
    toggleReview(post) {
      post.showFullReview = !post.showFullReview;
    },
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
      this.user.userId = localStorage.getItem('userId') || '';
      this.user.fullname = localStorage.getItem('fullname') || '';
      this.user.email = localStorage.getItem('email') || '';
      this.user.photoUrl = localStorage.getItem('photoUrl') || '';
    },
    selectAvatar(avatarSrc) {
      this.selectedAvatar = avatarSrc;
      this.user.photoUrl =  this.selectedAvatar;
      this.showAvatarSelection = false;
    },
    async updateProfile() {
      this.message = '';
 

  try {
    const response = await axios.put("http://localhost:8000/users/edit-user", this.user);
    
    localStorage.setItem('fullname', response.data.fullname);
    localStorage.setItem('email', response.data.email);
    localStorage.setItem('photoUrl', response.data.photoUrl);
    
    if (this.user.password) {
      localStorage.setItem('password', this.user.password);
      if (this.user.password && this.user.password.length < 8) {
    this.message = "Password must be at least 8 characters long.";
    this.isSuccess = false;
    return;
  }
    }
    
    this.message = 'Profile updated successfully!';
    this.isSuccess = true;
    
    // Kısa bir süre sonra ana sayfaya yönlendir
    setTimeout(() => {
      this.$router.push('/');
    }, 2000);

  } catch (error) {
    this.isSuccess = false;
    if (error.response) {
      switch(error.response.status) {
        case 409:
          this.message = error.response.data;
          break;
        case 400:
          this.message = "Invalid data submitted. Please check your inputs.";
          break;
        default:
          this.message = 'Update failed: ' + (error.response.data.message || 'Unknown error');
      }
    } else if (error.request) {
      this.message = 'No response received from the server. Please try again later.';
    } else {
      this.message = 'Error submitting form: ' + error.message;
    }
  }
},
    confirmDeleteAccount() {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        this.deleteAccount();
      }
    },
    async deleteAccount() {
      try {
        
        this.isSuccess = true;
        const response = await axios.delete(`http://localhost:8000/users/delete/${this.user.userId}`);
        this.message = response.data;
        // Mesajı göstermek için bir süre bekleyelim
      setTimeout(() => {
        this.message = ''; // Mesajı temizle
        localStorage.clear();
        this.$router.push('/landing'); // Ana sayfaya yönlendir
      }, 2000); // 2 saniye sonra yönlendir
      } catch (error) {
        this.isSuccess = false;
        if (error.response && error.response.data === `User not found with id: ${this.user.userId}`) {
          this.message='User not found. Please check your account details.';

        } else {
          this.message='An error occurred while deleting your account. Please try again.';
        }
        
         // Hata mesajını da bir süre gösterelim
      setTimeout(() => {
        this.message = '';
      }, 3000);
      }
    },
    editPost(postId) {
    this.$router.push({ name: 'PostEdit', params: { id: postId } });
    this.message='Post updated successfully';
  },
  async deletePost(postId) {
  if (confirm('Are you sure you want to delete this post?')) {
    try {
      await axios.delete(`http://localhost:8000/posts/delete/${postId}`);
      this.message = 'Post deleted successfully';
      this.isSuccess = true;
      this.userPosts = this.userPosts.filter(post => post.id !== postId);
      
      // Mesajı göstermek için bir süre bekleyelim
      setTimeout(() => {
        this.message = ''; // Mesajı temizle
        this.$router.push('/'); // Ana sayfaya yönlendir
      }, 2000); // 2 saniye sonra yönlendir
    } catch (error) {
      this.message = 'An error occurred while deleting the post.';
      this.isSuccess = false;
      
      // Hata mesajını da bir süre gösterelim
      setTimeout(() => {
        this.message = '';
      }, 3000);
    }
  }
},
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
.profile-content h1{
  text-align: center;
}

.profile-content{  
  margin-right: 50px;
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
  border-radius: 50%;
  
}
.avatar-selection {
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 10px;
  justify-content: center;
}

.avatar-option {
  cursor: pointer;
}

.avatar-option img {
  width: 75px;
  height: 75px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid whitesmoke;
}

.avatar-section current-avatar {
  width: 150px;
  height: 150px;
  padding-top: 50px;
  object-fit: cover;
  border-radius: 75%;
  
}

.current-avatar{
  width: 150px;
  height: 150px;
  margin-top: 20px;
  margin-bottom: 20px;
  object-fit: cover;
  border-radius: 75%;
  border: 3px solid whitesmoke;
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
button read-more-btn {
  background: none;
  border: none;
  color: #1877f2;
  cursor: pointer;
  font-weight: bold;
  padding: 5px 0;
  margin-top: 10px;
}

button read-more-btn:hover {
  text-decoration: underline;
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