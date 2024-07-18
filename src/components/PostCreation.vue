<template>
  <div id="post-creation">
    <form @submit.prevent="previewPost" v-if="!showPreview">
      <h2>Create a New Book Post</h2>
      
      <div class="form-group">
        <label for="bookTitle">Book Title:</label>
        <input v-model.trim="post.bookTitle" type="text" id="bookTitle" required>
      </div>

      <div class="form-group">
        <label for="bookType">Book Genre:</label>
        <select v-model="post.bookType" id="bookType" required>
          <option value="">Select a book genre</option>
          <option v-for="genre in bookGenres" :key="genre" :value="genre">{{ genre }}</option>
        </select>
      </div>

      <div class="form-group">
        <label for="authorName">Author:</label>
        <input v-model.trim="post.authorName" type="text" id="authorName" required>
      </div>

      <div class="form-group">
        <label for="bookPhotoUrl">Book Cover URL:</label>
        <input v-model.trim="post.bookPhotoUrl" type="url" id="bookPhotoUrl" required>
        <img v-if="post.bookPhotoUrl" :src="post.bookPhotoUrl" alt="Book Cover Preview" class="cover-preview">
      </div>        

      <div class="form-group">
        <label for="bookReview">Your Review:</label>
        <textarea v-model.trim="post.bookReview" id="bookReview" required></textarea>
        <small>{{ 1000 - post.bookReview.length }} characters remaining</small>
      </div>

      <button class="btn" type="submit" :disabled="!isFormValid">Preview Post</button>
    </form>

    <div v-if="showPreview" class="post-preview">
      <h2>Preview Your Post</h2>
      <div class="preview-content">
        <img :src="post.bookPhotoUrl" alt="Book Cover" class="book-cover">
        <h3>{{ post.bookTitle }}</h3>
        <p><strong>Author:</strong> {{ post.authorName }}</p>
        <p><strong>Genre:</strong> {{ post.bookType }}</p>
        <p><strong>Your Review:</strong></p>
        <p>{{ post.bookReview }}</p>
      </div>
      <div class="preview-actions">
        <button @click="showPreview = false" class="btn edit-btn">Edit Post</button>
        <button @click="submitPost" class="btn submit-btn" :disabled="loading">
            {{ loading ? 'Submitting...' : 'Submit Post' }}
        </button>
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
  data() {
    return {
      isSuccess: false,
      loading: false,
      post: {
        bookTitle: '',
        bookType: '',
        authorName: '',
        bookPhotoUrl: '',
        bookReview: '',
        userId: localStorage.getItem('userId')
      },
      bookGenres: ['HISTORY', 'ADVENTURE', 'PERSONAL', 'SCIENCE', 'THRILLER',
      'HORROR', 'CLASSIC', 'HUMOR', 'ROMANCE', 'RELIGION'], 
      showPreview: false,
      message: '',
      messageType: ''
    }
  },
  computed: {
    isFormValid() {
      return this.post.bookTitle && this.post.bookType && this.post.authorName && 
             this.post.bookPhotoUrl && this.post.bookReview;
    }
  },
  methods: {
    previewPost() {
      if (this.isFormValid) {
        this.showPreview = true;
      } else {
        this.message = 'Please fill in all fields';
        this.messageType = 'error';
      }
    },
    async submitPost() {
  this.loading = true;
  this.message = '';
  try {
    console.log('Sending post data:', this.post);
    const response = await axios.post('http://localhost:8000/posts/new-post', this.post);
    console.log(response.data);
    this.isSuccess = true;
    this.message = 'Post successfully submitted!';
    setTimeout(() => {
      this.$router.push('/');
    }, 2000);
    this.resetForm();
  } catch (error) {
    this.isSuccess = false;
    console.error('Error submitting post:', error);
    if (error.response) {
      console.error('Error data:', error.response.data);
      this.message = `Server error: ${error.response.status} - ${error.response.data.error || 'Unknown error'}`;
    } else if (error.request) {
      this.message = 'No response received from server. Please try again.';
    } else {
      this.message = 'Error setting up the request. Please try again.';
    }
  } finally {
    this.loading = false;
  }
},
    resetForm() {
      this.post = {
        bookTitle: '',
        bookType: '',
        authorName: '',
        bookPhotoUrl: '',
        bookReview: ''
      };
      this.showPreview = false;
    }
  }
}
</script>



<style scoped>
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

#post-creation {
  min-height: 100vh;
  width: 100%;
  background-image: url('@/assets/bookBackground.jpeg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
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

form, .post-preview {
  width: 100%;
  max-width: 500px;
  background-color: #FED8B1;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Prevent content from overflowing */
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input, select, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #dfc6c6;
  border-radius: 5px;
  font-size: 16px;
  box-sizing: border-box; /* Include padding in width calculation */
}

/* Specific styles for author and book title inputs */
input[type="text"] {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

textarea {
  height: 150px;
  resize: vertical;
}

.btn {
  width: 100%;
  padding: 0;
  background-color: #2d7ee7;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #1c6ad4;
}

.btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.cover-preview {
  max-width: 100px;
  max-height: 150px;
  margin: 10px auto;
  display: block;
}

.message {
  padding: 10px;
  border-radius: 5px;
  margin-top: 20px;
  text-align: center;
}

.error {
  background-color: #ffebee;
  color: #c62828;
}

.success {
  background-color: #e8f5e9;
  color: #2e7d32;
}

.preview-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.preview-actions .btn {
  width: 48%;
}

.edit-btn {
  background-color: #e6921d;
  padding: 0;
}

.submit-btn {
  background-color: #5cb85c;
  padding: 0;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  form, .post-preview {
    padding: 20px;
  }
}
</style>