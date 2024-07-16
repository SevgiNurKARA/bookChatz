<template>
  <div v-if="showPreview" class="post-preview">
    <h2>Preview Your Post</h2>
    <div class="preview-content">
      <img :src="post.bookPhotoUrl" alt="Book Cover" class="book-cover">
      <h3>{{ post.bookTitle }}</h3>
      <p><strong>Author:</strong> {{ post.authorName }}</p>
      <p><strong>Type:</strong> {{ post.bookType }}</p>
      <p><strong>Your Review:</strong></p>
      <p>{{ post.bookReview }}</p>
    </div>
    <div class="preview-actions">
      <button @click="showPreview = false" class="btn edit-btn">Edit Post</button>
      <button @click="submitPost" class="btn submit-btn">Submit Post</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'PostPreview',
  props: ['post'],
  data() {
    return {
      showPreview: true
    }
  },
  methods: {
    async submitPost() {
  try {
    const response = await axios.post('/posts/all', this.post);
    console.log('Post başarıyla gönderildi:', response.data);
    // You might want to add some user feedback here, like a success message
    // or redirecting to another page
  } catch (error) {
    console.error('Post gönderilirken hata oluştu:', error);
    // You might want to show an error message to the user here
  }
}
  }
}
</script>
  
  <style scoped>
  .post-preview {
  width: 100%;
  max-width: 500px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.preview-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.book-cover {
  max-width: 150px;  /* Adjust this value as needed */
  max-height: 225px; /* Maintaining a 2:3 aspect ratio */
  width: auto;
  height: auto;
  object-fit: contain;
  margin-bottom: 20px;
}

.preview-content h3 {
  margin-top: 0;
  text-align: center;
}

.preview-content p {
  width: 100%;
  text-align: left;
  margin: 5px 0;
}
  
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .edit-btn {
    background-color: #f0ad4e;
    color: white;
  }
  
  .submit-btn {
    background-color: #5cb85c;
    color: white;
  }
  </style>