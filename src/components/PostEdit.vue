<template>
    <div class="whole-page">
      <div class="post-edit">
        <h2>Edit Post</h2>
        <form @submit.prevent="updatePost">
          <div class="form-group">
            <label for="bookTitle">Book Title:</label>
            <input type="text" id="bookTitle" v-model="post.book.title" disabled>
          </div>
          <div class="form-group">
            <label for="bookAuthorName">Author:</label>
            <input type="text" id="bookAuthorName" v-model="post.book.authorName" disabled>
          </div>
          <div class="form-group">
            <label for="bookType">Book Type:</label>
            <input type="text" id="bookType" v-model="post.book.bookType" disabled>
          </div>
          <div class="form-group">
            <label for="bookPhotoUrl">Book Cover URL:</label>
            <input type="text" id="bookPhotoUrl" v-model="post.book.photoUrl" disabled>
          </div>
          <div class="form-group">
            <label for="review">Review:</label>
            <textarea id="review" v-model="post.review" required></textarea>
          </div>
          <button type="submit">Update Post</button>
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
  name: 'PostEdit',
  data() {
    return {
      isSuccess: false,
      message: '',
      post: {
        id: null,
        review: '',
        book: {
          title: '',
          authorName: '',
          bookType: '',
          photoUrl: '',
        }
      }
    }
  },
  created() {
    this.fetchPost();
  },
  methods: {
    async fetchPost() {
      try {
        const id = this.$route.params.id;
        const response = await axios.get(`http://localhost:8000/posts/${id}`);
        this.post = response.data;
      } catch (error) {
        this.showError('Error fetching post: ' + (error.response?.data?.message || error.message));
      }
    },
    async updatePost() {
      try {
         await axios.put(`http://localhost:8000/posts/edit-post`, {
          "bookTitle": this.post.book.title,
          "bookReview": this.post.review,
          "bookType": this.post.book.bookType,
          "authorName": this.post.book.authorName,
          "bookPhotoUrl": this.post.book.photoUrl,
          "userId": localStorage.getItem("userId"),
          "postId": this.post.id
        });
        this.showSuccess('Post updated successfully!');
        setTimeout(() => this.$router.push('/profile'), 2000);
      } catch (error) {
        this.showError('Error updating post: ' + (error.response?.data?.message || error.message));
      }
    },
    showSuccess(msg) {
      this.isSuccess = true;
      this.message = msg;
      setTimeout(() => this.message = '', 5000);
    },
    showError(msg) {
      this.isSuccess = false;
      this.message = msg;
      setTimeout(() => this.message = '', 5000);
    }
  }
}
</script>

  
  <style scoped>
  .whole-page {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 1rem;
    background-image: url('@/assets/bookBackground.jpeg');
    background-size: cover;
    background-position: center;
    min-height: 100vh;
  }
  
  .post-edit {
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #A67B5B;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  h2 {
    color: #131212;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
    color: #131212;
    font-weight: bold;
  }
  
  input[type="text"],
  textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
  }
  
  textarea {
    height: 100px;
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
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  