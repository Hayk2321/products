import create from 'zustand';

const useAuthStore = create((set) => ({
  email: localStorage.getItem('email') || '',
  password: localStorage.getItem('password') || '',
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
}));

export default useAuthStore;