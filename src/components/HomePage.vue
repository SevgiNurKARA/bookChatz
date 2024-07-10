<template>
  <div class="home-page">
    <header>
      <div class="logo">
        <img src="@/assets/bookChatz.jpg" alt="Logo">
      </div>
      <div class="user-avatar" @click="toggleUserMenu">
        <img :src="userAvatar" alt="User Avatar">
        <transition name="fade">
          <div v-if="showUserMenu" class="user-menu">
            <router-link to="/profile">Profile</router-link>
            <button @click="logout">Logout</button>
          </div>
        </transition>
      </div>
    </header>
    <main>
      <div class="post">
        <div class="post-header">
          <span class="date">{{ currentDate }}</span>
          <span class="user-name">{{ userFullName }}</span>
        </div>
        <div class="post-content">
          <h2>{{ bookName }}</h2>
          <div class="book-info">
            <img :src="bookCover" alt="Book Cover" class="book-cover">
            <div>
              <p><strong>Author:</strong> {{ bookAuthor }}</p>
              <p><strong>Genre:</strong> {{ bookGenre }}</p>
            </div>
          </div>
          <div class="review">
            <h3>Review</h3>
            <p ref="reviewText" :class="{ 'collapsed': !showFullReview }">
              {{ showFullReview ? review : truncatedReview }}
            </p>
            <button v-if="review.length > 300" @click="toggleReview" class="read-more-btn">
              {{ showFullReview ? 'Daha az göster' : 'Devamını oku' }}
            </button>
          </div>
        </div>
      </div>
      <div class="post">
        <div class="post-header">
          <span class="date">{{ currentDate }}</span>
          <span class="user-name">{{ userFullName }}</span>
        </div>
        <div class="post-content">
          <h2>{{ bookName }}</h2>
          <div class="book-info">
            <img :src="bookCover" alt="Book Cover" class="book-cover">
            <div>
              <p><strong>Author:</strong> {{ bookAuthor }}</p>
              <p><strong>Genre:</strong> {{ bookGenre }}</p>
            </div>
          </div>
          <div class="review">
            <h3>Review</h3>
            <p ref="reviewText" :class="{ 'collapsed': !showFullReview }">
              {{ showFullReview ? review : truncatedReview }}
            </p>
            <button v-if="review.length > 300" @click="toggleReview" class="read-more-btn">
              {{ showFullReview ? 'Daha az göster' : 'Devamını oku' }}
            </button>
          </div>
        </div>
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
      showFullReview: false,
      userFullName: '',
      currentDate: new Date().toLocaleDateString(),
      bookName: 'Nutuk',
      bookAuthor:  'Mustafa Kemal Atatürk',
      bookGenre:'History',
      bookCover: '@/assets/the-great-gatsby-a-novel-1.jpg',
      review: `1919 senesi Mayıs'ının 19. günü Samsun'a çıktım. Vaziyet ve manzara-i umumiye 

Osmanlı Devleti'nin dahil bulunduğu grup, Harb-i Umumi'de mağlup olmuş, Osmanlı ordusu her tarafta zedelenmiş, şeraiti ağır bir mütarekename imzalanmış. 

Büyük Harp'in uzun seneleri zarfında millet yorgun ve fakir bir halde. Millet ve memleketi Harb-i Umumi'ye sevk edenler, kendi hayatları endişesine düşerek memleketten firar etmişler. Saltanat ve hilafet mevkisini işgal eden Vahdettin, mütereddi, şahsını ve yalnız tahtını temin edebileceğini  tahayyül ettiği deni tedbirler araştırmakta. Damat Ferit Paşa'nın riyasetindeki kabine; âciz, haysiyetsiz, cebin, yalnız padişahın iradesine tâbi ve onunla beraber şahıslarını vikaye edebilecek herhangi bir vaziyete razı…

Hepimizin bildiği bu cümlelerle açılan Nutuk, bir milletin yeniden doğuş hikâyesinin kurtarıcısının gözünden anlatıldığı, Türkiye Cumhuriyeti tarihinin en temel metinlerinden biri. Bağımsızlığa giden yollarda neler yaşandığını, Kurtuluş Savaşı'nı ve cumhuriyetin ilanını Atatürk'ün değerlendirmeleriyle bu eşsiz eserde yıllardır okuyoruz ve okumaya devam edeceğiz.

Atatürk'ün 1927'de meclis kürsüsünden verdiği nutkun yazıya dökülmüş hali olan elinizdeki eser, 1934 baskısının tıpkıbasımı olarak hazırlandı.`,
    };
  },
  created() {
    this.loadUserAvatar();
    this.loadUserFullName();
  },
  computed: {
    truncatedReview() {
      return this.review.slice(0, 300) + '...';
    }
  },
  methods: {
    toggleReview() {
      this.showFullReview = !this.showFullReview;
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
  background-color: #f0f2f5;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #6F4E37;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

main {
  display: grid;
  gap: 10px;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem;
  background-color: #A67B5B;
}

.post {
  width: 100%;
  max-width: 800px;
  background-color: #FED8B1;
  border:1px solid #1c1e21;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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

.book-info {
  display: flex;
  margin-bottom: 1rem;
}

.book-cover {
  width: 100px;
  height: 150px;
  object-fit: cover;
  margin-right: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
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