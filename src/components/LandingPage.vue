<template>
    <div class="landing-page">
      <header>
        <div class="logo">
        <img src="@/assets/bookChatz.jpg" alt="Logo">
      </div>
        <nav>
          <ul>
            <li v-for="item in menuItems" :key="item">{{ item }}</li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>{{ headline }}</h2>
        <p>{{ subheadline }}</p>
        <button @click="callToAction">{{ ctaText }}</button>
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
        menuItems: ['Home', 'Log In', 'Register'],
        headline: 'Welcome to Our Book Talk',
        subheadline: 'Your Gateway to Great Reads.',
        ctaText: 'Lets dive in',
        currentYear: new Date().getFullYear()
      }
    },
    methods: {
      callToAction() {
        // Implement your call-to-action logic here
        console.log('Call to action clicked!')
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

  nav ul {
    display: flex;
    list-style-type: none;
  }
  
  nav ul li {
    margin-left: 20px;
  }
  
  main {
    text-align: center;
    margin-top: 50px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    cursor: pointer;
  }
  
  footer {
    margin-top: 50px;
    text-align: center;
  }
  </style>