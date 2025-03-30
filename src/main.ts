import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import './style.css';

const app = createApp(App);
app.use(router);

const pinia = createPinia();

app.use(pinia);
app.use(router);
app.mount('#app');