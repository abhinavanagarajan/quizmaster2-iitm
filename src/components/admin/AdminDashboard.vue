<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

interface Quiz {
  id: number;
  chapter_id: number;
  chapter_name: string;
  date_of_quiz: string;
  time_duration: string;
  remarks?: string;
}

interface Chapter {
  id: number;
  name: string;
}

const searchQuery = ref('');
const quizzes = ref<Quiz[]>([]);
const chapters = ref<Chapter[]>([]);
const isAddingQuiz = ref(false);
const errorMessage = ref('');

const newQuiz = ref({
  chapter_name: '',
  date_of_quiz: '',
  time_duration: '',
  remarks: ''
});

const fetchQuizzes = async () => {
  try {
    const response = await axios.get('http://localhost:5000/quizzes');
    quizzes.value = response.data;
  } catch (error) {
    console.error('Error fetching quizzes:', error);
  }
};

const fetchChapters = async () => {
  try {
    const response = await axios.get('http://localhost:5000/chapters/1/quizzes');
    chapters.value = response.data;
  } catch (error) {
    console.error('Error fetching chapters:', error);
  }
};

const addQuiz = async () => {
  if (!newQuiz.value.chapter_name || !newQuiz.value.date_of_quiz || !newQuiz.value.time_duration) {
    errorMessage.value = 'All fields are required!';
    return;
  }

  try {
    const response = await axios.post('http://localhost:5000/quizzes', {
      chapter_id: newQuiz.value.chapter_name,
      date_of_quiz: newQuiz.value.date_of_quiz,
      time_duration: newQuiz.value.time_duration,
      remarks: newQuiz.value.remarks || null
    });
    // quizzes.value.push(response.data);
    // newQuiz.value = { chapter_name: '', date_of_quiz: '', time_duration: '', remarks: '' };
    isAddingQuiz.value = false;
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = 'Failed to add quiz.';
  }
};

const handleDelete = async (id: number) => {
  try {
    await axios.delete(`http://localhost:5000/quizzes/${id}`);
    quizzes.value = quizzes.value.filter(quiz => quiz.id !== id);
  } catch (error) {
    console.error('Error deleting quiz:', error);
  }
};

const filteredQuizzes = computed(() => {
  return quizzes.value
});

onMounted(() => {
  fetchQuizzes();
  fetchChapters();
});
</script>

<template>
  <div class="admin-dashboard">
    <nav class="admin-nav">
      <router-link to="/admin">Home</router-link> |
      <router-link to="/admin/quiz">Quiz</router-link> |
      <router-link to="/admin/summary">Summary</router-link> |
      <a href="#" @click="$router.push('/logout')">Logout</a>
    </nav>

    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search quizzes..." />
    </div>

    <table class="subjects-table">
      <thead>
        <tr>
          <th>Chapter</th>
          <th>Date of Quiz</th>
          <th>Time Duration</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="quiz in filteredQuizzes" :key="quiz.id">
          <td>{{ quiz.chapter_name }}</td>
          <td>{{ quiz.date_of_quiz }}</td>
          <td>{{ quiz.time_duration }}</td>
          <td>
            <button @click="handleDelete(quiz.id)" class="delete">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <button class="add-button" @click="isAddingQuiz = true">Add New Quiz</button>

    <div v-if="isAddingQuiz" class="modal">
      <div class="modal-content">
        <h3>Add New Quiz</h3>
        <table>
          <tr>
            <td><label>Chapter:</label></td>
            <td><input type="text" v-model="newQuiz.chapter_name" />
            </td>
          </tr>
          <tr>
            <td><label>Date of Quiz:</label></td>
            <td><input type="date" v-model="newQuiz.date_of_quiz" /></td>
          </tr>
          <tr>
            <td><label>Time Duration:</label></td>
            <td><input type="time" v-model="newQuiz.time_duration" /></td>
          </tr>
          <tr>
            <td><label>Remarks:</label></td>
            <td><input type="text" v-model="newQuiz.remarks" /></td>
          </tr>
        </table>
        
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        <button @click="addQuiz">Submit</button>
        <button @click="isAddingQuiz = false" class="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

.admin-dashboard {
  padding: 2rem;
}

.admin-nav {
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

.subjects-table {
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

.add-button {
  margin-top: 2rem;
  background: #1a73e8;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.delete {
  background: #dc3545;
  margin-left: 0.5rem;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.cancel {
  background: gray;
  margin-left: 1rem;
}

.error-message {
  color: red;
  margin-top: 0.5rem;
}
</style>
