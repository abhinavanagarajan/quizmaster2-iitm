import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import AdminDashboard from '../components/admin/AdminDashboard.vue';
import UserDashboard from '../components/user/UserDashboard.vue';
import Login from '../components/auth/Login.vue';
import Register from '../components/auth/Register.vue';
import QuizAttempt from '../components/quiz/QuizAttempt.vue';
import QuizScores from '../components/quiz/QuizScores.vue';

const routes = [
  
  {
    path: '/admin',
    component: AdminDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    component: UserDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/quiz/:id',
    component: QuizAttempt,
    meta: { requiresAuth: true }
  },
  {
    path: '/scores',
    component: QuizScores,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;