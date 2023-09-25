import { defineStore, storeToRefs } from 'pinia';
import { useGlobal } from './global';
import router from '../router';
export const useAuthStore = defineStore('auth', () => {
  const globalStore = useGlobal()
  const baseUrl = 'http://0.0.0.0:8000/api/'

  async function logout(){
    try {
      const response = await fetch(`${baseUrl}logout`,{
        method:"GET", 
        headers:{
          'Authorization' : `Bearer ${localStorage.getItem('token')}`,
          'Accept' : 'application/json'
        }       
      })
      localStorage.removeItem('token')
      const data = await response.json()
      if (data.status) {
        globalStore.setAlertMsg({ messages: data.messages, status: 1 })
        globalStore.setUser(null)
        globalStore.setIsAuthenticated(false)
        router.push({name:'dashboard'})
      } else {
        globalStore.setAlertMsg({ messages: [data.messages], status: 2 })
      }
    } catch (error) {
      globalStore.setAlertMsg({ messages: [e.message], status: 2 })      
    }
    
  }

  async function register(formData) {
    try {
      const response = await fetch(`${baseUrl}register`, {
        method: "POST",
        body: formData
      })
      const data = await response.json()
      if (data.status) {
        globalStore.setAlertMsg({ messages: data.messages, status: 1 })
        router.push({name:'login'})
      } else {
        globalStore.setAlertMsg({ messages: [data.messages], status: 2 })
      }
    } catch (e) {
      globalStore.setAlertMsg({ messages: [e.message], status: 2 })
    }
  }
  async function login(formData) {
    try {
      const response = await fetch(`${baseUrl}login`, {
        method: "POST",
        body: formData
      })
      const data = await response.json()
      if (data.status) {
        globalStore.setAlertMsg({ messages: ['berhasil login'], status: 1 })
        localStorage.setItem('token', data.messages.token)
        globalStore.setUser({id:data.messages.id, name:data.messages.name})
        globalStore.isAuthenticated = true        
      } else {
        globalStore.setAlertMsg({ messages: [data.messages], status: 2 })
      }
    } catch (e) {
      globalStore.setAlertMsg({ messages: [e.message], status: 2 })
    }
    router.push({name:'dashboard'})
  }
  return { register, login, logout }
})