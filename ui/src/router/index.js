// Composables
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/home',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
      },
      
      {
        path: '/factories/:id',
        name: 'FactoryDetails',
        component: () => import('@/views/FactoryDetails.vue'),
        props: true,
      },
      {
        path: '/settings',
        name: 'UserSettings',
        component: () => import('@/views/UserSettings.vue'),
        props: true,
      },
    ],
    
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register.vue'), // Bu satırı ekleyin
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
