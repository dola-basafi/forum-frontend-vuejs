<script setup>
import { storeToRefs } from 'pinia';
import { useGlobal } from '../stores/global';
const { user,isAuthenticated } = storeToRefs(useGlobal())
</script>

<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Halaman</div>
          <router-link class="nav-link" :to="{ name: 'dashboard' }">
            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
            Dashboard
          </router-link>
          <router-link v-if="isAuthenticated" class="nav-link" :to="{ name: 'question-own' }">
            <div class="sb-nav-link-icon"><i class="fas fa-tachometer-alt"></i></div>
            Daftar Pertanyaan Saya
          </router-link>         
        </div>
      </div>
      <div v-if="isAuthenticated" class="sb-sidenav-footer">
        <div class="small">Logged in as:</div>
        {{ user.name }}
      </div>
    </nav>
  </div>
</template>

  
<style scoped></style>