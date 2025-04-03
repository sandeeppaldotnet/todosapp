// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import AboutUs from './views/AboutUs.vue';
import ContactPage from './views/ContactPage.vue';

const routes = [
  { path: '/', component: HomePage },      // Home route
  { path: '/about', component: AboutUs },  // About Us page
  { path: '/contact', component: ContactPage } // Contact page
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
