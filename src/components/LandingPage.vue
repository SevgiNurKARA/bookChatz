<template>
  <div id="landing-page">
    <header>
      <div class="logo">
        <img src="@/assets/bookChatz.jpg" alt="Logo">
        <div class="about" @click="$router.push('/about-us')">About Us</div>
      </div>
      <nav>
        <button @click="$router.push('/users/login')">Sign In</button>
        <button @click="$router.push('/users/register')">Sign Up</button>
      </nav>
    </header>
    <main>
      <h1 class="main-heading">{{ headline }}</h1>
      <p class="subheading">{{ subheadline }}</p>
      
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">{{ error }}</div>
      <div v-else>
        <div class="posts-carousel" v-if="posts.length > 0">
          <div class="posts-container">
            <div class="post" v-for="(post, index) in posts" :key="post.id" :style="slideStyle(index)">
              <img :src="post.bookPhotoUrl" :alt="post.bookTitle" class="book-cover">
              <div class="post-content">
                <h3>{{ post.bookTitle }}</h3>
                <p class="author">by {{ post.bookAuthorName }}</p>
                <p class="genre">Type: {{ post.bookType }}</p>
                <p class="review">{{ truncate(post.review, 200) }}</p>
                <p class="date">Posted on: {{ post.postDate }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <section class="top-ten-books" v-if="topBooks.length > 0">
          <h2>Top 10 Books</h2>
          <div class="top-books-grid">
            <div v-for="book in topBooks" :key="book.id" class="top-book-card">
              <img :src="book.photoUrl" :alt="book.title" class="top-book-cover">
              <div class="top-book-info">
                <h3>{{ book.bookTitle }}</h3>
                <p class="author">by {{ book.authorName }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    <footer>
      <p>&copy; {{ currentYear }} {{ companyName }}. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      companyName: 'BOOK CHATZ',
      headline: 'Welcome to Our Book Talk',
      subheadline: 'Your Gateway to Great Reads.',
      currentYear: new Date().getFullYear(),
      currentIndex: 0,
      topBooks: [],      
      posts: [],
      loading: false,
      error: null,
      autoSlideInterval: null,
    };
  },
  methods: {
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + this.posts.length) % this.posts.length;
    },
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % this.posts.length;
    },
    slideStyle(index) {
      const offset = (index - this.currentIndex + this.posts.length) % this.posts.length;
      return {
        transform: `translateX(${offset * 100}%)`,
        transition: 'transform 0.5s ease-in-out',
      };
    },
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 5000); // Change slide every 5 seconds
    },
    stopAutoSlide() {
      clearInterval(this.autoSlideInterval);
    },
    async fetchPosts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:8000/posts/all');
        this.posts = response.data;
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
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get('http://localhost:8000/books/all');
        this.topBooks = response.data.slice(3, 13);
      } catch (error) {
        console.error('Error fetching top books:', error);
        this.error = 'Failed to fetch top books. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
    truncate(text, length = 100) {
      if (!text) return ''; 
      return text.length > length ? text.slice(0, length) + '...' : text;
    },
  },
  created() {
    this.fetchPosts();
    this.fetchTopBooks();
  },
   mounted() {
    this.startAutoSlide();
  },
  beforeUnmount() {
    this.stopAutoSlide();
  },
};
</script>

<style scoped>
#landing-page {
  font-family: Arial, sans-serif;
  width: 1200;
  margin: 0 auto;
  min-height: 100vh;
  padding: 20px;
  background: rgba(255, 255, 255, 0.9) url('~@/assets/bookBackground.jpeg') no-repeat center center / cover;
  display: flex;
  flex-direction: column;
  align-items: center;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 25px;
}

.logo img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
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

nav {
  display: flex;
  gap: 10px;
}

nav button {
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color:  #2975A7;
}

nav button:hover {
  background-color: #003664;
}
main {
  text-align: center;
  width: 100%;
  max-width: 1200px;
}
.main-heading {
  font-size: 2.5rem;
  color: #0e0a0a;
  text-align: center;
  margin-bottom: 0.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.subheading {
  font-size: 1.2rem;
  color: #070101;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 300;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.book-cover {
  display: block;
  width: 200px;
  height: 300px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.posts-carousel {
  position: relative;
  width: 100%;
  max-width: 800px;
  height: 300px; /* Adjust based on your needs */
  margin: 40px auto;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.posts-container {
  display: flex;
  height: 100%;
  width: 100%;
}

.post {
  flex: 0 0 100%;
  display: flex;
  padding: 20px;
  background-color: #ffffff;
  box-sizing: border-box;
  position: absolute;
  width: 100%;
  height: 100%;
}

.book-cover {
  width: 150px;
  height: 225px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border: 1px thick double black;
}

.book-cover:hover {
  transform: scale(1.05);
}

.post-content {
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 25px;
  
}

.post-content h3 {
  margin: 0 0 10px;
  font-size: 1.4em;
  color: #333;
}

.post-content .author,
.post-content .genre {
  margin: 5px 0;
  font-style: italic;
  color: #666;
}

.post-content .review {
  margin: 15px 0;
  line-height: 1.6;
  color: #444;
  flex-grow: 1;
  text-align: left;
}

.post-content .date {
  font-size: 0.8em;
  color: #888;
  text-align: right;
  margin-top: auto;
  margin-right: 10px;
}


  .book-cover {
    margin-bottom: 20px;
  }

  .post-content {
    padding-left: 0;
    text-align: center;
  }

footer {
  margin-top: 50px;
  text-align: center;
}

.top-ten-books {
  width: 100%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.top-books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.top-book-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
  transition: transform 0.3s ease;
}

.top-book-card:hover {
  transform: translateY(-5px);
}

.top-book-cover {
  width: 120px;
  height: 180px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.top-book-info {
  margin-top: 10px;
}

.top-book-info h3 {
  font-size: 1em;
  margin: 5px 0;
}

.top-book-info .author {
  font-size: 0.8em;
  color: #666;
}
 

@media (max-width: 768px) {
  .top-books-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  .post {
    flex-direction: column;
    align-items: center;
  }
  
}
</style>
