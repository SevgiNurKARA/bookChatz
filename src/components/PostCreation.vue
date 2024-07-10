<template>
  <div id="post-creation">
    <form @submit.prevent="submitPost"> 
      <div class="form-group">
        <label for="bookTitle">Title:</label>
        <input v-model="post.bookTitle" type="text" id="bookTitle" required>
      </div>

      <div class="form-group">
        <label for="bookType">Type:</label>
        <select v-model="post.bookType" id="bookType" required>
          <option value="">Select a book type</option>
          <option value="HISTORY">HISTORY</option>
          <option value="ADVENTURE">ADVENTURE</option>
          <option value="PERSONAL">PERSONAL</option>
          <option value="SCIENCE">SCIENCE</option>
          <option value="THRILLER">THRILLER</option>
          <option value="HORROR">HORROR</option>
          <option value="CLASSIC">CLASSIC</option>
          <option value="HUMOR">HUMOR</option>
          <option value="ROMANCE">ROMANCE</option>
          <option value="RELIGION">RELIGION</option>
        </select>
      </div>

      <div class="form-group">
        <label for="authorName">Author:</label>
        <input v-model="post.authorName" type="text" id="authorName" required>
      </div>

      <div class="form-group">
        <label for="bookPhotoUrl">Book Photo:</label>
        <input v-model="post.bookPhotoUrl" type="url" id="bookPhotoUrl" required>
      </div>        

      <div class="form-group">
        <label for="bookReview">Review:</label>
        <textarea v-model="post.bookReview" id="bookReview" required></textarea>
      </div>
      <button class="btn" type="submit">Submit</button>
      <p v-if="message" class="error-message">{{ message }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'

export default {
  name: 'PostCreation',
  
  setup() {
    const router = useRouter()
    const store = useStore()
    const message = ref('')

    const post = ref({
      bookTitle: '',
      bookType: '',
      authorName: '',
      bookPhotoUrl: '',
      bookReview: '',
    })

    const submitPost = async () => {
      try {
        let userId = null
        if (store && store.state && store.state.user) {
          userId = store.state.user.id
        }
        
        if (!userId) {
          throw new Error('User ID not available. Please ensure you are logged in.')
        }

        const postWithUserId = {
          ...post.value,
          userId: userId
        }

        const response = await axios.post('http://localhost:8080/users/new-post', postWithUserId)
        
        if (response.data && response.data.id) {
          router.push({ name: 'ViewPost', params: { postId: response.data.id } })
        } else {
          throw new Error('Post creation successful, but no post ID returned.')
        }
      } catch (error) {
        if (error.response) {
          message.value = `Server error: ${error.response.status} - ${error.response.data}`
        } else if (error.request) {
          message.value = 'Network error: No response received from server. Please check your internet connection and try again.'
        } else {
          message.value = 'Error: ' + error.message
        }
        console.error('Error details:', error)
      }
    }

    return { 
      post, 
      submitPost,
      message
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
  height: 100%;
  width: 100%;
  background-image: url('@/assets/bookBackground.jpeg');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-group {
  width: 400px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border: 1px solid #050505;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.75);
  overflow: hidden;
}

form {
  box-sizing: border-box;
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

label {
  color: rgba(255, 255, 255, 0.8);
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 2px;
  padding-left: 10px;
}

input, select, textarea {
  height: 40px;
  padding: 0 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.8);
  color: #181612;
  border: none;
  border-radius: 20px;
  line-height: 40px;
}

textarea {
  height: 80px;
  line-height: 20px;
  padding: 10px 20px;
}

.btn {
  height: 40px;
  margin: 10px 0;
  background: #2d7ee7;
  color: white;
  text-transform: uppercase;
  border: 1px solid #000;
  border-radius: 40px;
  line-height: 40px;
  cursor: pointer;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
