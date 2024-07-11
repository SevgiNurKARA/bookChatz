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
      <h2>{{ headline }}</h2>
      <p>{{ subheadline }}</p>
      <div class="posts-container">
        <div class="post" v-for="post in posts" :key="post.id">
          <img :src="post.bookCover" :alt="post.bookName" class="book-cover">
          <div class="post-content">
            <h3>{{ post.bookName }}</h3>
            <p class="author">by {{ post.bookAuthor }}</p>
            <p class="genre">Type: {{ post.bookType }}</p>
            <p class="review">{{ truncate(post.review) }}</p>
            <p class="date">Posted on: {{ post.date }}</p>
          </div>
        </div>
      </div>
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
      posts: [
        {
          id: 1,
          date: new Date(2023, 6, 9).toLocaleDateString(),
          userName: '',
          bookName: 'The Life Of Prophet Muhammed(s.a.v)',
          bookAuthor: 'Martin LINGS',
          bookType: 'RELIGION',
          bookCover: 'https://1.bp.blogspot.com/_GNxGuhDeops/RvTFbWihxQI/AAAAAAAAAA8/-yeu8KLDBhw/s1600/ingtr.bmp',
          review: `"1984" is a chilling portrayal of a totalitarian future where critical thought is suppressed under a surveillance state. Orwell's masterpiece remains eerily relevant today, serving as a stark warning about the dangers of totalitarianism, surveillance, and the manipulation of truth. The novel's exploration of themes like doublethink, newspeak, and the erosion of personal freedom resonates deeply in our current digital age. Winston Smith's struggle against the omnipresent Big Brother is a powerful reminder of the importance of individual liberty and the courage to maintain one's humanity in the face of oppression. This book is not just a classic of dystopian literature, but a crucial lens through which to view our own society's relationship with power, truth, and freedom.`,
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
  
    }
  },
  methods: {
    truncate(text) {
      return text.length > 200 ? text.slice(0, 200) + '...' : text;
    }
  }
}
</script>

<style scoped>
#landing-page {
  font-family: Arial, sans-serif;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8) url('~@/assets/bookBackground.jpeg') no-repeat center center / cover;
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

.posts-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 20px 0;
  overflow-x: auto;
}

.post {
  width: calc(33.33% - 20px);
  min-width: 300px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
}

.book-cover {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 15px;
}

.post-content {
  width: 100%;
}

h3 {
  margin: 0 0 10px;
  font-size: 1.4em;
  color: #333;
}

.author, .genre {
  margin: 5px 0;
  font-style: italic;
  color: #666;
}

.review {
  margin: 15px 0;
  line-height: 1.6;
}

.date {
  font-size: 0.9em;
  color: #888;
  text-align: right;
}

footer {
  margin-top: 50px;
  text-align: center;
}

@media (max-width: 768px) {
  .post {
    width: 100%;
  }
}
</style>