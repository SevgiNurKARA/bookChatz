import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from './components/LandingPage.vue'
import HomePage from './components/HomePage.vue';
import PostCreation from './components/PostCreation.vue';
import Login from './components/Log-in.vue';
import UserRegister from './components/UserRegister.vue';
import ProfilePage from './components/ProfilPage.vue';
import PostEdit from './components/PostEdit.vue';
import AboutUs from './components/AboutUs.vue';

const routes = [
  { path: '/landing', component: LandingPage },
  { path: '/', name: 'Home', component: HomePage },
  { path: '/posts/new-post',name: 'CreatePost', component: PostCreation },
  { path: '/users/login', name: 'Login', component: Login },
  { path: '/users/register', name: 'Register', component: UserRegister },
  { path: '/profile', name: 'Profile',  component: ProfilePage },
  { path: '/posts/preview/:id', name: 'PostEdit', component: PostEdit},
  { path: '/about-us', name: 'AboutUs', component: AboutUs}
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;



