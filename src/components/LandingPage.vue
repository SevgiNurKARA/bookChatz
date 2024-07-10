<template>
  <div id="landingPage">
    <header>
      <div class="logo">
        <img src="@/assets/bookChatz.jpg" alt="Logo">
      </div>
      <nav>
        <button @click="$router.push('/users/login')">Login</button>
    <button @click="$router.push('/users/register')">Register</button>
      </nav>
    </header>
    <main>
      <h2>{{ headline }}</h2>
      <p>{{ subheadline }}</p>
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
      currentYear: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.landing-page {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

nav {
  display: flex;
  gap: 10px;
}

.btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

main {
  text-align: center;
  margin-top: 50px;
}

footer {
  margin-top: 50px;
  text-align: center;
}
</style>
