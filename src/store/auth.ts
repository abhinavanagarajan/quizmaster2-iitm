import { defineStore } from 'pinia';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: false
  }),
  
  actions: {
    async login(email: string, password: string) {
      // TODO: Implement actual API call
      this.user = {
        id: '1',
        email,
        role: email.includes('admin') ? 'admin' : 'user'
      };
      this.isAuthenticated = true;
    },
    
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    }
  }
});