<template>
  <div id="landing-page">
    <header>
      <div class="logo">
        <img src="@/assets/bookChatz.jpg" alt="Logo">
      </div>
      <nav>
        <button @click="$router.push('/users/login')">Sign In</button>
        <button @click="$router.push('/users/register')">Sign Up</button>
      </nav>
    </header>
    <main>
      <h1 class="main-heading">{{ headline }}</h1>
      <p class="subheading">{{ subheadline }}</p>
      <div class="posts-slider">
        <button @click="prevSlide" class="slider-btn prev">&lt;</button>
        <div class="posts-container" :style="{ transform: `translateX(${-currentIndex * 100}%)` }">
          <div class="post" v-for="post in posts" :key="post.id">
            <img :src="post.bookCover" :alt="post.bookName" class="book-cover">
            <div class="post-content">
              <h3>{{ post.bookName }}</h3>
              <p class="author">by {{ post.bookAuthor }}</p>
              <p class="genre">Type: {{ post.bookType }}</p>
              <p class="review">{{ truncate(post.review, 200) }}</p>
              <p class="date">Posted on: {{ post.date }}</p>
            </div>
          </div>
        </div>
        <button @click="nextSlide" class="slider-btn next">&gt;</button>
      </div>
      <section class="top-ten-books">
      <h2>Top 10 Books</h2>
      <div class="top-books-grid">
        <div v-for="book in topTenBooks" :key="book.id" class="top-book-card">
          <img :src="book.photoUrl" :alt="book.title" class="top-book-cover">
          <div class="top-book-info">
            <h3>{{ book.title }}</h3>
            <p class="author">by {{ book.authorName }}</p>
          </div>
        </div>
      </div>
    </section>
    </main>
    <footer>
      <p>&copy; {{ currentYear }} {{ companyName }}. All rights reserved.</p>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      companyName: 'BOOK CHATZ',
      headline: 'Welcome to Our Book Talk',
      subheadline: 'Your Gateway to Great Reads.',
      currentYear: new Date().getFullYear(),
      currentIndex: 0,
      
      topTenBooks: [  
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
          date: new Date(2023, 6, 9).toLocaleDateString(),
          userName: '',
          bookName: 'The Life Of Prophet Muhammed(s.a.v)',
          bookAuthor: 'Martin LINGS',
          bookType: 'RELIGION',
          bookCover: 'https://1.bp.blogspot.com/_GNxGuhDeops/RvTFbWihxQI/AAAAAAAAAA8/-yeu8KLDBhw/s1600/ingtr.bmp',
          review: "1984 is a chilling portrayal of a totalitarian future where critical thought is suppressed under a surveillance state. Orwell's masterpiece remains eerily relevant today, serving as a stark warning about the dangers of totalitarianism, surveillance, and the manipulation of truth. The novel's exploration of themes like doublethink, newspeak, and the erosion of personal freedom resonates deeply in our current digital age. Winston Smith's struggle against the omnipresent Big Brother is a powerful reminder of the importance of individual liberty and the courage to maintain one's humanity in the face of oppression. This book is not just a classic of dystopian literature, but a crucial lens through which to view our own society's relationship with power, truth, and freedom.",
        },
        {
          id: 2,
          date: new Date().toLocaleDateString(),
          userName: '',
          bookName: 'The Surgeon',
          bookAuthor: 'Tess GERRITSEN',
          bookType: 'THRILLER',
          bookCover: 'https://m.media-amazon.com/images/I/81X2W7kBNjL._SX342_.jpg',
          review: "He slips into homes at night and walks silently into bedrooms where women lie sleeping, about to awaken to a living nightmare. The precision of his methods suggests that he is a deranged man of medicine, prompting the Boston newspapers to dub him 'The Surgeon.' Led by Detectives Thomas Moore and Jane Rizzoli, the cops must consult the victim of a nearly identical crime: Two years ago, Dr. Catherine Cordell fought back and filled an attacker before he could complete his assault. Now this new killer is re-creating, with chilling accuracy, the details of Cordell's ordeal. With every new murder he seems to be taunting her, cutting ever closer, from her hospital to her home. And neither Moore nor Rizzoli can protect Cordell from a ruthless hunter who somehow understands—and savors—the secret fears of every woman he kills.",
        },
        {
          id: 3,
          date: new Date(2024, 6, 6).toLocaleDateString(),
          userName: '',
          bookName: 'The Bloodstream',
          bookAuthor: 'Tess GERRİTSEN',
          bookType: 'HORROR',
          bookCover: 'https://m.media-amazon.com/images/I/81IoUHDbGOL._AC_UY218_.jpg',
          review: "Tess Gerritsen again weaves frighteningly realistic medical detail into heart-stopping suspense, as a small-town doctor races to unravel the roots of a violent epidemic - before it destroys everything she loves. Lapped by the gentle waters of Locust Lake, the small resort town of Tranquility, Maine, seems like the perfect spot for Dr. Claire Elliot to shelter her adolescent son, Noah, from the distractions of the big city, and the lingering memory of his father's death. She's also hopeful that she can earn the trust of the town as she builds a new practice. But all her plans unravel with the news of a shocking incident: a teenage boy under her care has committed an appalling act of violence. Claire has stopped prescribing a controversial drug to the troubled boy, a decision that some in town now second-guess. But before she can defend herself, a rash of new teenage violence erupts in Tranquility, forcing Claire to perform increasingly risky emergency procedures. And when one of her patients dies, the town's panic turns to fury. Shaken by accusations, and fearful that Noah is now at risk, Claire desperately searches for a medical cause behind the murderous epidemic. She begins to suspect that the placid waters of Locust lake conceal a disturbing history - and an insidiously lethal danger. But while Claire races to save the town - and her son - from harm, she discovers an even greater threat: a shocking conspiracy to manipulate nature, and turn innocents to slaughter.",
        }
      ],
      topTenIndex: 0, // Add topTenIndex for top ten slider
    };
  },
  methods: {
    truncate(text, length = 100) {
    if (!text) return ''; 
    return text.length > length ? text.slice(0, length) + '...' : text;
  },
  prevTopTenSlide() {
    if (this.topTenIndex > 0) {
      this.topTenIndex--;
    }
  },
  nextTopTenSlide() {
    if (this.topTenIndex < this.topTenBooks.length - 1) {
      this.topTenIndex++;
    }
  },
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },
    nextSlide() {
      if (this.currentIndex < this.posts.length - 1) {
        this.currentIndex++;
      }
    },
  },
  //created() {
    // Initialize topTenBooks with the first 10 books from topBooks
    //this.topTenBooks = this.topBooks.slice(0, 10);
  //}
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

.logo img {
  height: 75px;
  width: 75px;
  border-radius: 50%;
}

nav {
  display: flex;
  gap: 10px;
}

nav button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 50px;
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

.posts-slider {
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 40px auto;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.posts-container {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.post {
  flex: 0 0 100%;
  display: flex;
  padding: 20px;
  background-color: #ffffff;
  box-sizing: border-box;
}

.book-cover {
  width: 150px;
  height: 225px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.book-cover:hover {
  transform: scale(1.05);
}

.post-content {
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
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
}

.post-content .date {
  font-size: 0.8em;
  color: #888;
  text-align: right;
  margin-top: auto;
}

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.slider-btn:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.slider-btn.prev {
  left: 10px;
}

.slider-btn.next {
  right: 10px;
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

.slider-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 18px;
  cursor: pointer;
  z-index: 10;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
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