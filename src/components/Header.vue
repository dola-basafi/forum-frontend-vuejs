<script setup>
import { storeToRefs } from 'pinia';
import { useGlobal } from '../stores/global';
import {useAuthStore} from '../stores/auth';
import { computed } from 'vue';

const { isAuthenticated, getCategories } = storeToRefs(useGlobal())
const {logout} = useAuthStore()

const check = computed(() => {
  return isAuthenticated.value
})

</script>

<template>
  <nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <a class="navbar-brand ps-3" href="#">Dola Project</a>
    <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i
        class="fas fa-bars fa-beat-fade"></i>
    </button>

    
    <div class="btn-group ms-auto me-1">
      <button type="button" class="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        Kategori
      </button>
      <ul class="dropdown-menu">
        <li v-for="item in getCategories"><a class="dropdown-item" href="#">{{ item.name }}</a></li>
      </ul>
    </div>
    <form class="d-none d-md-inline-block form-inline  me-0 me-md-3 my-2 my-md-0">
      <div class="input-group">
        <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..."
          aria-describedby="btnNavbarSearch" />
        <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
      </div>
    </form>
    <div v-if="!check">
      <router-link :to="{ name: 'login' }" class="btn btn-primary me-3">Login</router-link>
      <router-link :to="{ name: 'register' }" class="btn btn-info me-3">Register</router-link>
    </div>
    <ul v-else class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown"
          aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
          <li><a class="dropdown-item" href="#!">Settings</a></li>
          <li><a class="dropdown-item" href="#!">Activity Log</a></li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li><button class="dropdown-item bg-danger text-light" @click="logout">Logout</button></li>
        </ul>
      </li>
    </ul>
  </nav>
</template>

  
<style scoped></style>