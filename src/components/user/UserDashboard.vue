<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth';

const router = useRouter();
const authStore = useAuthStore();

interface Quiz {
  id: string;
  title: string;
  subject: string;
  dateTime: string;
}

const quizzes = ref<Quiz[]>([
  {
    id: '1',
    title: 'Mathematics Basics',
    subject: 'Mathematics',
    dateTime: '2025-03-20 10:00'
  },
  {
    id: '2',
    title: 'Science Fundamentals',
    subject: 'Science',
    dateTime: '2025-03-21 14:00'
  }
]);

const searchQuery = ref('');

const filteredQuizzes = computed(() => {
  return quizzes.value.filter(quiz => 
    quiz.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    quiz.subject.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const logout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<template>
  <div class="user-dashboard">
    <nav class="user-nav">
      <router-link to="/dashboard">Home</router-link> |
      <router-link to="/scores">Scores</router-link> |
      <router-link to="/summary">Summary</router-link> |
      <a href="#" @click.prevent="logout">Logout</a>
    </nav>

    <div class="search-bar">
      <input 
        type="text" 
        v-model="searchQuery" 
        placeholder="Search quizzes..."
      />
    </div>

    <table class="quizzes-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Quiz Title</th>
          <th>Subject</th>
          <th>Date/Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="quiz in filteredQuizzes" :key="quiz.id">
          <td>{{ quiz.id }}</td>
          <td>{{ quiz.title }}</td>
          <td>{{ quiz.subject }}</td>
          <td>{{ quiz.dateTime }}</td>
          <td>
            <router-link :to="`/quiz/${quiz.id}`" class="start-quiz">
              Start Quiz
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.user-dashboard {
  padding: 2rem;
}

.user-nav {
  margin-bottom: 2rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-bar {
  margin-bottom: 2rem;
}

.search-bar input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.quizzes-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f8f9fa;
  font-weight: 600;
}

.start-quiz {
  background: #1a73e8;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
}

.start-quiz:hover {
  background: #1557b0;
}
</style>