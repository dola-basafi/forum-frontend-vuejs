<script setup>
import {useAuthStore} from '../stores/auth';
const authStore = useAuthStore()

const register =  async () =>{
  const form = document.getElementById('regis')
  const submitter = document.querySelector("button[value=submit]")
  const formData = new FormData(form, submitter)
  authStore.register(formData)
}

</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-7">
        <div class="card shadow-lg border-0 rounded-lg mt-5">
          <div class="card-header">
            <h3 class="text-center font-weight-light my-4">Register</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="register" id="regis">
              <div class="form-floating mb-3">
                <input class="form-control" id="inputNama" type="text" placeholder="" name="name"/>
                <label for="inputNama">Nama</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" id="inputUsername" type="text" placeholder="" name="username"/>
                <label for="inputNama">Username</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" id="inputKota" type="text" placeholder="" name="city"/>
                <label for="inputNama">Kota</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" id="inputEmail" type="email" placeholder="name@example.com" name="email"/>
                <label for="inputEmail">Email</label>
              </div>
              <div class="row mb-3">
                <div class="form-floating mb-3 mb-md-0">
                  <input class="form-control" id="inputPassword" type="password" placeholder="Create a password" name="password" />
                  <label for="inputPassword">Password</label>
                </div>
              </div>
              <div class="d-grid mx-auto col-4"> 
                <button class="btn btn-primary  " value="submit">Buat akun</button>
              </div>
              
            </form>
          </div>
          <div class="card-footer text-center py-3">
            <div class="small"><router-link :to="{ name: 'login' }">sudah punya akun? pergi ke halaman login</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
<style scoped></style>