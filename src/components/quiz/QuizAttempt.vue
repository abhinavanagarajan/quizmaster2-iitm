<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

interface Question {
  id: string;
  statement: string;
  options: string[];
}

const route = useRoute();
const router = useRouter();
const currentQuestion = ref(0);
const timeLeft = ref(3600); // 1 hour in seconds
const selectedAnswer = ref('');

const questions = ref<Question[]>([
  {
    id: '1',
    statement: 'What is 2 + 2?',
    options: ['3', '4', '5', '6']
  },
  // Add more questions here
]);

let timer: number;

onMounted(() => {
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--;
    } else {
      submitQuiz();
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});

const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const submitQuiz = () => {
  // TODO: Implement API call
  router.push('/scores');
};
</script>

<template>
  <div class="quiz-container">
    <div class="quiz-header">
      <div class="question-counter">
        Question {{ currentQuestion + 1 }}/{{ questions.length }}
      </div>
      <div class="timer">Time Left: {{ formatTime(timeLeft) }}</div>
    </div>

    <div class="question-content">
      <h3>{{ questions[currentQuestion].statement }}</h3>
      <div class="options">
        <label v-for="(option, index) in questions[currentQuestion].options" 
               :key="index" 
               class="option">
          <input 
            type="radio" 
            :value="option" 
            v-model="selectedAnswer"
          >
          {{ option }}
        </label>
      </div>
    </div>

    <div class="quiz-actions">
      <button 
        @click="currentQuestion++"
        v-if="currentQuestion < questions.length - 1"
      >
        Save and Next
      </button>
      <button 
        @click="submitQuiz"
        v-else
        class="submit"
      >
        Submit Quiz
      </button>
    </div>
  </div>
</template>

<style scoped>
.quiz-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.timer {
  font-weight: bold;
  color: #dc3545;
}

.question-content {
  margin-bottom: 2rem;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border: 1px solid #eee;
  border-radius: 4px;
  cursor: pointer;
}

.option:hover {
  background: #f8f9fa;
}

.quiz-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #1a73e8;
  color: white;
}

button.submit {
  background: #28a745;
}
</style>