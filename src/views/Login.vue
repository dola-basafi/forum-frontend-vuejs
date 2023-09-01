<script setup>
import { useAuthStore } from '../stores/auth';
const authStore = useAuthStore()

const login = async () => {
    const form = document.getElementById('login')
    const submitter = document.querySelector("button[value=submit]")
    const formData = new FormData(form, submitter)
    authStore.login(formData)
}
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div class="card-header">
                        <h3 class="text-center font-weight-light my-4">Login</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="login" id="login">
                            <div class="form-floating mb-3">
                                <input name="username" class="form-control" id="inputEmail" type="text" placeholder="" />
                                <label for="inputEmail">Username</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input class="form-control" id="inputPassword" type="password" placeholder=""
                                    name="password" />
                                <label for="inputPassword">Password</label>
                            </div>

                            <div class="d-grid mx-auto col-4">
                                <button class="btn btn-primary  " value="submit">Login</button>
                            </div>
                            
                        </form>
                    </div>
                    <div class="card-footer text-center py-3">
                        <div class="small"><router-link :to="{ name: 'register' }">belum punya akun? register!</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

  
<style scoped></style>