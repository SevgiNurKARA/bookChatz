<template>
  <div class="home-page">
    <header>
      <div class="logo">
        <img src="@/assets/bookChatz.jpg" alt="Logo">
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
        <div class="post" v-for="post in posts" :key="post.id">
          <div class="post-header">
            <span class="date">{{ post.date }}</span>
            <span class="user-name">{{ post.userName }}</span>
          </div>
          <div class="post-content">
            <h2>{{ post.bookName }}</h2>
            <div class="book-info">
              <img :src="post.bookCover" alt="Book Cover" class="book-cover">
              <div>
                <p><strong>Author:</strong> {{ post.bookAuthor }}</p>
                <p><strong>Genre:</strong> {{ post.bookType }}</p>
              </div>
            </div>
            <div class="review">
              <h3>Review</h3>
              <p :class="{ 'collapsed': !post.showFullReview && post.review.length > 300 }">
            {{ post.showFullReview || post.review.length <= 300 ? post.review : post.review.slice(0, 300) + '...' }}
          </p>
          <button v-if="post.review.length > 300" @click="toggleReview(post)" class="read-more-btn">
            {{ post.showFullReview ? 'Daha az göster' : 'Devamını oku' }}
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
export default {
  name: 'HomePage',
  data() {
    return {
      userAvatar: '',
      showUserMenu: false,
      topBooks: [
        { id: 1, title: "To Kill a Mockingbird", authorName: "Harper Lee", photoUrl: "https://m.media-amazon.com/images/I/51g3u0pKK4L._SY445_SX342_.jpg" },
        { id: 2, title: "1984", authorName: "George Orwell", photoUrl: "https://avatars.dzeninfra.ru/get-zen_doc/1706621/pub_61a0e1c2e90f1c2241dbfefb_61a0ef8835cb395eb604a57e/scale_1200" },
        { id: 3, title: "Pride and Prejudice", authorName: "Jane Austen", photoUrl: "https://m.media-amazon.com/images/I/81NLDvyAHrL._AC_UY218_.jpg" },
        { id: 4, title: "The Great Gatsby", authorName: "F. Scott Fitzgerald", photoUrl: "https://m.media-amazon.com/images/I/91pySFftptL._AC_UY218_.jpg" },
        { id: 5, title: "One Hundred Years of Solitude", authorName: "Gabriel García Márquez", photoUrl: "https://m.media-amazon.com/images/I/714ZLzX852L._AC_UY218_.jpg" },
        { id: 6, title: "The Catcher in the Rye", authorName: "J.D. Salinger", photoUrl: "https://m.media-amazon.com/images/I/71c-1s150eL._AC_UY218_.jpg" },
        { id: 7, title: "The Hobbit", authorName: "J.R.R. Tolkien", photoUrl: "https://m.media-amazon.com/images/I/51HJMYGOdBL._SY445_SX342_.jpg" },
        { id: 8, title: "The Hunger Games", authorName: "Suzanne Collins", photoUrl: "https://m.media-amazon.com/images/I/81gExM+-XtL._AC_UY218_.jpg" },
        { id: 9, title: "The Da Vinci Code", authorName: "Dan Brown", photoUrl: "https://m.media-amazon.com/images/I/81gPg90cAML._AC_UY218_.jpg" },
        { id: 10, title: "The Alchemist", authorName: "Paulo Coelho", photoUrl: "https://m.media-amazon.com/images/I/81FPzmB5fgL._AC_UY218_.jpg" },
      ],
      posts: [
      {
          id: 1,
          date: new Date(2024, 6, 9).toLocaleDateString(),
          userName: '',
          bookName: 'The Life Of Prophet Muhammed(s.a.v)',
          bookAuthor: 'Martin LİNGS',
          bookType: 'RELIGION',
          bookCover: 'https://1.bp.blogspot.com/_GNxGuhDeops/RvTFbWihxQI/AAAAAAAAAA8/-yeu8KLDBhw/s1600/ingtr.bmp',
          review: `"1984" is a chilling portrayal of a totalitarian future where critical thought is suppressed under a surveillance state. Orwell's masterpiece remains eerily relevant today, serving as a stark warning about the dangers of totalitarianism, surveillance, and the manipulation of truth. The novel's exploration of themes like doublethink, newspeak, and the erosion of personal freedom resonates deeply in our current digital age. Winston Smith's struggle against the omnipresent Big Brother is a powerful reminder of the importance of individual liberty and the courage to maintain one's humanity in the face of oppression. This book is not just a classic of dystopian literature, but a crucial lens through which to view our own society's relationship with power, truth, and freedom.`,
          showFullReview: false,
          get truncatedReview() {
            return this.review.slice(0, 300) + '...';
          },
        },
        {
          id: 2,
          date: new Date().toLocaleDateString(),
          userName: '',
          bookName: 'The Surgeon',
          bookAuthor: 'Tess GERRITSEN',
          bookType: 'THRILLER',
          bookCover: 'https://m.media-amazon.com/images/I/81X2W7kBNjL._SX342_.jpg',
          review: `He slips into homes at night and walks silently into bedrooms where women lie sleeping, about to awaken to a living 
          nightmare. The precision of his methods suggests that he is a deranged man of medicine, prompting the Boston newspapers to dub him
           “The Surgeon.” Led by Detectives Thomas Moore and Jane Rizzoli, the cops must consult the victim of a nearly identical crime:
            Two years ago, Dr. Catherine Cordell fought back and filled an attacker before he could complete his assault.
             Now this new killer is re-creating, with chilling accuracy, the details of Cordell’s ordeal. 
             With every new murder he seems to be taunting her, cutting ever closer, from her hospital to her home. 
             And neither Moore nor Rizzoli can protect Cordell from a ruthless hunter who somehow understands—and savors—the secret fears of every woman he kills.`,
          showFullReview: false,
          get truncatedReview() {
            return this.review.slice(0, 300) + '...';
          }
        },
        {
          id: 3,
          date: new Date(2024, 6, 6).toLocaleDateString(),
          userName: '',
          bookName: 'The Bloodstream',
          bookAuthor: 'Tess GERRİTSEN',
          bookType: 'HORROR',
          bookCover: 'https://m.media-amazon.com/images/I/81IoUHDbGOL._AC_UY218_.jpg',
          review: `Tess Gerritsen again weaves frighteningly realistic medical detail into heart-stopping suspense, as a small-town doctor races to unravel the roots of a violent epidemic - before it destroys everything she loves.

Lapped by the gentle waters of Locust Lake, the small resort town of Tranquility, Maine, seems like the perfect spot for Dr. Claire Elliot to shelter her adolescent son, Noah, from the distractions of the big city, and the lingering memory of his father's death. She's also hopeful that she can earn the trust of the town as she builds a new practice. But all her plans unravel with the news of a shocking incident: a teenage boy under her care has committed an appalling act of violence.

Claire has stopped prescribing a controversial drug to the troubled boy, a decision that some in town now second-guess. But before she can defend herself, a rash of new teenage violence erupts in Tranquility, forcing Claire to perform increasingly risky emergency procedures. And when one of her patients dies, the town's panic turns to fury.

Shaken by accusations, and fearful that Noah is now at risk, Claire desperately searches for a medical cause behind the murderous epidemic. She begins to suspect that the placid waters of Locust lake conceal a disturbing history - and an insidiously lethal danger. But while Claire races to save the town - and her son - from harm, she discovers an even greater threat: a shocking conspiracy to manipulate nature, and turn innocents to slaughter.`,
          showFullReview: false,
          get truncatedReview() {
            return this.review.slice(0, 300) + '...';
          }
        }
      ],
      };
  },
  created() {
    this.loadUserAvatar();
    this.loadUserFullName();
  },
  computed: {
    postsTruncatedReviews() {
    return this.posts.map(post => {
      return post.review.length > 300 
        ? post.review.slice(0, 300) + '...' 
        : post.review;
    });
  }
  },
  methods: {
    toggleReview(post) {
      if (post.review.length > 300) {
        post.showFullReview = !post.showFullReview;
      }
  },
    loadUserAvatar() {
      const savedAvatar = localStorage.getItem('userAvatar');
      if (savedAvatar) {
        this.userAvatar = savedAvatar;
      } else {
        this.userAvatar = '@/assets/default-avatar.png';
      }
    },
    loadUserFullName() {
      const savedFullName = localStorage.getItem('fullname');
      if (savedFullName) {
        this.userFullName = savedFullName;
      } else {
        this.userFullName = 'Jane Doe';
      }
    },
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
    navigateToCreatePost() {
      this.$router.push('/posts/new-post')
    },
    logout() {
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userPassword');
      localStorage.removeItem('fullname');
      localStorage.removeItem('userAvatar');
      
      this.$router.push('/users/login');
      this.showUserMenu = false;
    }
  }
};
</script>

<style scoped>
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
  flex-direction: column;
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