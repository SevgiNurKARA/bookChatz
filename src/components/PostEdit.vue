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
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'PostEdit',
    data() {
      return {
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
          console.error('Error fetching post:', error);
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
            "postId":this.post.id
          });
          alert('Post updated successfully!');
          this.$router.push('/profile');
        } catch (error) {
          alert('An error occurred while updating the post.');
        }
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
    background-color: #6F4E37;
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
  