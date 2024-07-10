import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import PostCreation from './components/PostCreation.vue';
import Login from './components/Log-in.vue';
import UserRegister from './components/UserRegister.vue';


const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/create', name: 'CreatePost', component: PostCreation },
  { path: '/login', name: 'Login', component: Login },
  { path: '/users/register', name: 'Register', component: UserRegister }
  // Add other routes here
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
