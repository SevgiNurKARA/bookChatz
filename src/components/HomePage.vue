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
      <section class="about">
        <h2>About Us</h2>
        <p>Your about content here...</p>
      </section>
      <section class="post">
        <router-link to="/posts/new-post">Create a Post</router-link>
        <h2>Latest Post</h2>
        <p>Your post content here...</p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      userAvatar: '@/assets/logo.png',
      showUserMenu: false
    };
  },
  methods: {
    toggleUserMenu() {
      this.showUserMenu = !this.showUserMenu;
    },
    logout() {
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
  height: 100vh;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
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
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
}

.user-menu a {
  padding: 0.5rem;
  text-decoration: none;
  color: #333;
}

.user-menu button {
  padding: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #333;
}

.user-menu a:hover,
.user-menu button:hover {
  background-color: #f0f0f0;
}

main {
  display: flex;
  flex: 1;
}

.about,
.post {
  flex: 1;
  padding: 1rem;
}
</style>
