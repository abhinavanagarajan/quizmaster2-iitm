<script setup lang="ts">
import { ref } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface QuizScore {
  id: string;
  maxQuestions: number;
  date: string;
  score: number;
  subject: string;
}

const quizScores = ref<QuizScore[]>([
  {
    id: '1',
    maxQuestions: 10,
    date: '2025-03-15',
    score: 8,
    subject: 'Mathematics'
  },
  {
    id: '2',
    maxQuestions: 15,
    date: '2025-03-16',
    score: 12,
    subject: 'Science'
  },
  {
    id: '3',
    maxQuestions: 20,
    date: '2025-03-17',
    score: 18,
    subject: 'History'
  }
]);

const chartData = {
  labels: quizScores.value.map(score => score.subject),
  datasets: [
    {
      label: 'Score',
      data: quizScores.value.map(score => (score.score / score.maxQuestions) * 100),
      backgroundColor: '#1a73e8',
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      max: 100,
      title: {
        display: true,
        text: 'Score Percentage'
      }
    }
  },
  plugins: {
    legend: {
      display: true,
      position: 'top' as const
    },
    title: {
      display: true,
      text: 'Quiz Performance by Subject'
    }
  }
};
</script>

<template>
  <div class="scores-container">
    <h2>Quiz Scores</h2>
    
    <div class="scores-table-container">
      <table class="scores-table">
        <thead>
          <tr>
            <th>Quiz ID</th>
            <th>Max Questions</th>
            <th>Date</th>
            <th>Score</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="score in quizScores" :key="score.id">
            <td>{{ score.id }}</td>
            <td>{{ score.maxQuestions }}</td>
            <td>{{ score.date }}</td>
            <td>{{ score.score }}/{{ score.maxQuestions }}</td>
            <td>{{ ((score.score / score.maxQuestions) * 100).toFixed(1) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="chart-container">
      <Bar 
        :data="chartData"
        :options="chartOptions"
        class="performance-chart"
      />
    </div>
  </div>
</template>

<style scoped>
.scores-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h2 {
  margin-bottom: 2rem;
  color: #333;
}

.scores-table-container {
  margin-bottom: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.scores-table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover {
  background: #f8f9fa;
}

.chart-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  height: 400px;
}

.performance-chart {
  width: 100%;
  height: 100%;
}
</style>