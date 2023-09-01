<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue';
import Sidebar from './components/Sidebar.vue';
import Footer from './components/Footer.vue';
import { computed } from 'vue';
import { useGlobal } from './stores/global';
import { storeToRefs } from 'pinia';


const globalStore = useGlobal()
const { alertMsg } = storeToRefs(globalStore)
const alert = computed(() => {
  return alertMsg.value
})
const closeAlert = () => {
  globalStore.setAlertMsg  ({ messages: '', status: 0 })
}
const toggleClass = computed(() => {
  if (alertMsg.value.status) {
    if (alertMsg.value.status === 1) {
      return "alert-success"
    } else {
      return "alert-warning"
    }
  } else {
    return ""
  }
})



// Toggle the side navigation
window.addEventListener('DOMContentLoaded', event => {

const sidebarToggle = document.body.querySelector('#sidebarToggle');
if (sidebarToggle) {
    // Uncomment Below to persist sidebar toggle between refreshes
    // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
    //     document.body.classList.toggle('sb-sidenav-toggled');
    // }
    sidebarToggle.addEventListener('click', event => {
        event.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
        // localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
    });
}

});
</script>

<template>
  <div class="sb-nav-fixed">
    <Header />
    <div id="layoutSidenav">
      <Sidebar />
      <div id="layoutSidenav_content">
        <main>
          <div v-if="alert.status" class="alert mt-1" :class="toggleClass" id="alert">
            <button type="button" class="btn-close float-end bg-danger" @click="closeAlert"> </button>
            <span class="float-end">close</span>
            <div v-for="item in alert.messages" id="alert-msg">
              {{item}}
            </div>
          </div>
          <RouterView />
        </main>
      </div>
    </div>
  </div>
  <Footer />
</template>

<style scoped></style>
