import { createRouter, createWebHistory } from 'vue-router';
import Hot from '../views/Hot.vue';
import PostDetail from '../views/PostDetail.vue';
import apiService from '../services/apiService.js';

const routes = [
  {
    path: '/hot',
    name: 'hot',
    component: Hot,
  },
  {
    path: '/post/:id',
    name: 'post-detail',
    component: PostDetail,
    props: true, 
    beforeEnter: async (to, from, next) => {
      try {
        const post = await apiService.getPostDetails(to.params.id);
        to.params.post = post;  
        next();
      } catch (error) {
        console.error('Error fetching post data:', error);
        next('/'); 
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
