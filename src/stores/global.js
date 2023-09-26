import { defineStore } from "pinia";
import { ref } from "vue";
import { useAuthStore } from './auth';



export const useGlobal = defineStore('global', () => {
  const authStore = useAuthStore()
  const isAuthenticated = ref(localStorage.getItem('token') ? true : false)
  const user = ref({ name: null, id: null })
  const alertMsg = ref({ messages: '', status: 0 })
  const getCategories = ref(null)
  const getQuestions = ref(null)
  const baseUrl = ref('http://0.0.0.0:8000/api/');
  

  const check = async () => {
    try {
      const response = await fetch(`${baseUrl.value}user`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Accept': 'application/json'
        }
      })
      const data = await response.json()
      if (!data.error) {
        setUser({ id: data.id, name: data.name })
        console.log(data)
      } else {
        isAuthenticated.value = false
        localStorage.removeItem('token')
      }

    } catch (e) {
      isAuthenticated.value = false
      localStorage.removeItem('token')
    }
  }
  check()
  async function setUser(val) {
    user.value = val
  }
  async function setQuestions() {
    try {
      const response = await fetch(`${baseUrl.value}question/index`, {
        method: "GET",
      })
      const data = await response.json()
      if (data.status) {
        getQuestions.value = data.messages
      } else {
        authStore.setAlertMsg({ messages: [data.messages], status: 2 })
      }
    } catch (e) {
      authStore.setAlertMsg({ messages: [e.message], status: 2 })
    }
  }
  setQuestions()

  const setIsAuthenticated = (val) => {
    isAuthenticated.value = val
  }
  const setAlertMsg = (val) => {
    alertMsg.value = val
  }
  const setCategories = async () => {
    try {
      const response = await fetch(`${baseUrl.value}category/index`, {
        method: "GET",
      })
      const data = await response.json()
      if (data.status) {
        getCategories.value = data.messages
      } else {
        authStore.setAlertMsg({ messages: [data.messages], status: 2 })
      }
    } catch (e) {
      setAlertMsg({ messages: [e.message], status: 2 })
    }
  }
  setCategories()
  setQuestions()
  return {
    isAuthenticated,
    alertMsg,
    setAlertMsg,
    setIsAuthenticated,
    getCategories,
    setCategories,
    getQuestions,
    setUser,
    baseUrl,
    user
  }
})