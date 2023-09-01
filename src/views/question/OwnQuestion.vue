<script setup>
import { useGlobal } from '../../stores/global';
import { ref } from 'vue';
const storeGlobal = useGlobal()
const baseUrl = storeGlobal.baseUrl
const myQuestion = ref(null)
const getListQuestion = async () => {
  try {
    const response = await fetch(`${baseUrl}question/own`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json'
      }
    })
    const data = await response.json()
    if (data.status) {
      myQuestion.value = data.messages
      console.log(data.value)
    } else {
      globalStore.setAlertMsg({ messages: data.messages, status: 2 })
    }
  } catch (e) {
    globalStore.setAlertMsg({ messages: e.message, status: 2 })
  }
}
getListQuestion()
</script>

<template>
  <div class="container">
    <table class="table mt-3">
      <thead>
        <th>Daftar Pertanyaan <router-link class="float-end btn bg-primary text-light"
            :to="{ name: 'question-create' }">Buat
            Pertanyaan</router-link></th>
      </thead>
      <tbody>
        <tr v-for="item in myQuestion">
          <td>{{ item.title }}
            <span class="float-end">Detail</span>
            <p class="mb-0 pb-0"><small>kategori : {{ item.category.name }}</small> <small class="float-end">Di buat oleh
                : {{ item.user.name }}</small> </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

  
<style scoped></style>