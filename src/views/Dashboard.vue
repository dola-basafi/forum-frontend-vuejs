<script setup>
import { storeToRefs } from 'pinia';
import {useGlobal} from '../stores/global';
const {getQuestions,isAuthenticated} =storeToRefs(useGlobal())  

</script>

<template>
  <div class="container">
    <table class="table mt-3">
      <thead>
        <th>Daftar Pertanyaan <router-link v-if="isAuthenticated" class="float-end btn bg-primary text-light" :to="{name:'question-create'}">Buat Pertanyaan</router-link></th>
      </thead>
      <tbody>
        <tr v-for="item in getQuestions" >
          <td >{{ item.title }}
            <router-link class="float-end" :to="{name:'question-post', params:{id: item.id}}">Detail</router-link>            
            <p class="mb-0 pb-0"><small>kategori : {{ item.category.name }}</small> <small class="float-end">Di buat oleh : {{ item.user.name }}</small> </p>
          </td>          
        </tr>
      </tbody>
    </table>
  </div>
</template>

  
<style scoped></style>