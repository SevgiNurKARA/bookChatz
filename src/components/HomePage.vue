<template>
  <div class="home-page">
    <header>
      <div class="logo">
        <img src="@/assets/bookChatz.jpg" alt="Logo">
        <div class="about" @click="$router.push('/about-us')">About Us</div>
      </div>
      <div class="header-actions">
        <button class="create-post-btn" @click="navigateToCreatePost">
          <i class="fas fa-plus"></i> Create New Post
        </button>
      <div class="user-avatar" @click="toggleUserMenu">
        <img :src="userAvatar" alt="User Avatar">
        <transition name="fade">
          <div v-if="showUserMenu" class="user-menu">
            <router-link to="/profile">Profile</router-link>
            <button @click="logout">Logout</button>
          </div>
        </transition>
      </div>
    </div>
    </header>
      <main class="main-content">
      <div class="posts-section">
        <p v-if="loading">Loading posts...</p>
        <p v-if="error">{{ error }}</p>
        <div class="post" v-for="post in posts" :key="post.id">
          <div class="post-header">
            <span class="date">{{ post.postDate }}</span>
            <span class="user-name">{{ post.userFullname }}</span>
          </div>
          <div class="post-content">
            <h2>{{ post.bookName }}</h2>
            <div class="book-info">
              <img :src="post.bookPhotoUrl" alt="Book Cover" class="book-cover">
              <div>
                <p><strong>Author:</strong> {{ post.bookAuthorName }}</p>
                <p><strong>Genre:</strong> {{ post.bookType }}</p>
              </div>
            </div>
            <div class="review">
              <h3>Review</h3>
              <p :class="{ 'collapsed': !post.showFullReview && post.review.length > 300 }">
            {{ post.showFullReview || post.review.length <= 300 ? post.review : post.review.slice(0, 300) + '...' }}
          </p>
          <button v-if="post.review.length > 300" @click="toggleReview(post)" class="read-more-btn">
            {{ post.showFullReview ? 'Show less' : 'Show more' }}
          </button>
            </div>
          </div>
        </div>
      </div>
      <div class="top-books-section">
  <h2>Top 10 Books</h2>
  <ul class="top-books-list">
    <li v-for="book in topBooks" :key="book.id" class="top-book-item">
      <img :src="book.photoUrl" :alt="book.title" class="top-book-cover">
      <div class="top-book-info">
        <h3>{{ book.title }}</h3>
        <p>{{ book.authorName }}</p>
      </div>
    </li>
  </ul>
</div>
    </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HomePage',
  data() {
    return {
      userAvatar: '',
      showUserMenu: false,
      posts: [],
      topBooks: [],
      loading: false,
      error: null
    };
  },
  created() {
    this.loadUserAvatar();
    this.loadUserFullName();
    this.fetchPosts();
    this.fetchTopBooks();
  },
  methods: {
    async fetchPosts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:8000/posts/all');
        this.posts = response.data.map(post => ({
          ...post,
          showFullReview: false
        }));
      } catch (error) {
        console.error('Error fetching posts:', error);
        if (error.response) {
          console.error('Response status:', error.response.status);
          console.error('Response data:', error.response.data);
          this.error = `Failed to fetch posts. Server responded with ${error.response.status}.`;
        } else if (error.request) {
          console.error('No response received:', error.request);
          this.error = 'Failed to fetch posts. No response received from server.';
        } else {
          console.error('Error setting up the request:', error.message);
          this.error = 'Failed to fetch posts. Error setting up the request.';
        }
      } finally {
        this.loading = false;
      }
    },
    async fetchTopBooks() {
      try {
        const response = await axios.get('http://localhost:8000/books/all');
        this.topBooks = response.data.slice(3, 13); // Adjust slice to get top 10 books
      } catch (error) {
        console.error('Error fetching top books:', error);
      }
    },
    toggleReview(post) {
      post.showFullReview = !post.showFullReview;
    },
    loadUserAvatar() {
      const savedAvatar = localStorage.getItem('photoUrl');
      this.userAvatar = savedAvatar || '@/assets/default-avatar.png';
    },
    loadUserFullName() {
      const savedFullName = localStorage.getItem('fullname');
      this.userFullName = savedFullName || 'Jane Doe';
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
    navigateToCreatePost() {
      this.$router.push('/posts/new-post');
    },
    logout() {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userPassword');
      localStorage.removeItem('fullname');
      localStorage.removeItem('photoUrl');
      
      this.$router.push('/users/login');
      this.showUserMenu = false;
    }
  }
};
</script>

<style>
.home-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #6F4E37;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #6F4E37;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: relative;
  z-index: 1000;
}
.header-actions {
  display: flex;
  align-items: center;
}

.about {
  background-color: #2975A7;
  color: #fff;
  padding: 10px 20px;
  border-radius: 25px;
  border: 1px solid #070101;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.about:hover {
  background-color: #003664;
}
.create-post-btn {
  margin-right: 20px;
  padding: 10px 15px;
  background-color: #2d7ee7;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.create-post-btn i {
  margin-right: 5px;
}

.create-post-btn:hover {
  background-color: #1c6ad4;
}
.logo {
  display: flex;
  align-items: center;
  gap: 25px;
}


.logo img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.user-avatar {
  position: relative;
  cursor: pointer;
}

.user-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.user-menu {
  position: absolute;
  right: 0;
  top: 100%;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.user-menu a, .user-menu button {
  padding: 0.5rem;
  text-decoration: none;
  color: #333;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
}

.user-menu a:hover, .user-menu button:hover {
  background-color: #f0f0f0;
}

.main-content {
  display: flex;
  justify-content: space-between;
  margin-right: 50px;
  background-color: #6F4E37;
}
.posts-section {
  display: flex;
  flex-direction: column-reverse;
  gap: 30px;
}
.post {
  width: 100%;
  max-width: 800px;
  background-color: #FED8B1;
  border:1px solid #1c1e21;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-left: 20px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #65676b;
  
}

.post-content h2 {
  margin-bottom: 1rem;
  color: #1c1e21;
  
}
.top-books-section {
  width: 25%;
  padding: 20px;
  background-color: #FED8B1;
  border-radius: 8px;
  height: fit-content;
  border: 1px solid black;
}

.top-books-list {
  list-style-type: none;
  padding: 0;
}

.top-book-item {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.top-book-cover {
  width: 50px;
  height: 75px;
  object-fit: cover;
  margin-right: 10px;
}
.top-book-cover:hover{
  transform: scale(1.2);
  background-color: #003664;
}

.top-book-info {
  flex-grow: 1;
}

.top-book-info h3 {
  margin: 0;
  font-size: 14px;
}

.top-book-info p {
  margin: 5px 0 0;
  font-size: 12px;
  color: #666;
}
.book-info {
  display: flex;
  margin-bottom: 20px;
}

.book-cover {
  width: 100px;
  height: 150px;
  object-fit: cover;
  margin-right: 20px;
}

.book-cover:hover{
  transform: scale(1.2);
}

.book-info p {
  margin: 0.5rem 0;
  color: #65676b;
}

.review h3 {
  margin-bottom: 0.5rem;
  color: #1c1e21;
}

.review p {
  line-height: 1.6;
  color: #1c1e21;
}

.review p.collapsed {
  max-height: 120px;
  overflow: hidden;
}

.read-more-btn {
  background: none;
  border: none;
  color: #1877f2;
  cursor: pointer;
  font-weight: bold;
  padding: 5px 0;
  margin-top: 10px;
}

.read-more-btn:hover {
  text-decoration: underline;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e4e6eb;
  color: #65676b;
  font-size: 0.9rem;
  
}

</style>