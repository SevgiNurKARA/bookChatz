Copy<template>
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
        <button @click="submitPost" class="btn submit-btn">Submit Post</button>
      </div>
    </div>

    <p v-if="message" :class="['message', messageType]">{{ message }}</p>
  </div>
</template>
<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

export default {
  name: 'PostCreation',
  
  setup() {
    const router = useRouter()
    const store = useStore()
    const message = ref('')
    const messageType = ref('')
    const showPreview = ref(false)

    const bookGenres = [
      'HISTORY', 'ADVENTURE', 'PERSONAL', 'SCIENCE', 'THRILLER',
      'HORROR', 'CLASSIC', 'HUMOR', 'ROMANCE', 'RELIGION'
    ]

    const post = ref({
      bookTitle: '',
      bookType: '',
      authorName: '',
      bookPhotoUrl: '',
      bookReview: '',
    })

    const isFormValid = computed(() => {
      return post.value.bookTitle.trim() !== '' &&
             post.value.bookType !== '' &&
             post.value.authorName.trim() !== '' &&
             post.value.bookPhotoUrl.trim() !== '' &&
             post.value.bookReview.trim() !== '' &&
             post.value.bookReview.length <= 1000
    })

    const previewPost = () => {
      if (isFormValid.value) {
        showPreview.value = true
      } else {
        setMessage('Please fill out all fields correctly.', 'error')
      }
    }

    const submitPost = async () => {
      try {
        const userId = store.state.user?.id
        if (!userId) {
          throw new Error('User ID not available. Please ensure you are logged in.')
        }

        const response = await axios.post('http://localhost:8080/users/new-post', {
          ...post.value,
          userId
        })
        
        if (response.data && response.data.id) {
          setMessage('Post created successfully!', 'success')
          router.push({ name: 'ViewPost', params: { postId: response.data.id } })
        } else {
          throw new Error('Post creation successful, but no post ID returned.')
        }
      } catch (error) {
        handleError(error)
      }
    }

    const setMessage = (msg, type) => {
      message.value = msg
      messageType.value = type
      setTimeout(() => {
        message.value = ''
        messageType.value = ''
      }, 5000)
    }

    const handleError = (error) => {
      if (error.response) {
        setMessage(`Server error: ${error.response.status} - ${error.response.data}`, 'error')
      } else if (error.request) {
        setMessage('Network error: No response received from server. Please check your internet connection and try again.', 'error')
      } else {
        setMessage('Error: ' + error.message, 'error')
      }
      console.error('Error details:', error)
    }

    return { 
      post,
      bookGenres,
      previewPost,
      submitPost,
      message,
      messageType,
      showPreview,
      isFormValid
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
  padding: 10px;
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
  background-color: #f0ad4e;
}

.submit-btn {
  background-color: #5cb85c;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  form, .post-preview {
    padding: 20px;
  }
}
</style>