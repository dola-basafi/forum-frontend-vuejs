<script setup>
import { ref } from 'vue';
import { useGlobal } from '../stores/global';

const storeGlobal = useGlobal()
const baseUrl = storeGlobal.baseUrl
const profil = ref(null)
const getProfil = async () => {
    try {
        const response = await fetch(`${baseUrl}profil`, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        })
        const data = await response.json()
        if (data.status) {
            profil.value = data.messages
            console.log(profil.value)
        } else {
            globalStore.setAlertMsg({ messages: data.messages, status: 2 })
        }
    } catch (e) {
        globalStore.setAlertMsg({ messages: data.messages, status: 2 })
    }
}
getProfil()
const profilChange = async () => {
    const form = document.getElementById('editProfil')
    const submitter = document.querySelector("button[value=submit]")
    const formData = new FormData(form, submitter)
    const fileInput = document.getElementById('inputFile')
    if (fileInput.files.length > 0) {
        formData.append('file', fileInput.files[0])
    }
    try {
        const response = await fetch(`${baseUrl}profil`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Accept': 'application/json, text/plain, */*'
            },
            body: formData
        })
        const data = await response.json()
        if (data.status) {
            globalStore.setAlertMsg({ messages: ['berhasil update profil'], status: 1 })
            profil.value = { city: '', name: '' }
            getProfil()
        } else {
            globalStore.setAlertMsg({ messages: [data.messages], status: 2 })
        }
    } catch (e) {
        globalStore.setAlertMsg({ messages: [e.message], status: 2 })

    }
}
</script>

<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-8">
                <div class="card shadow-lg border-0 rounded-lg mt-5">
                    <div class="card-header">
                        <h3 class="text-center font-weight-light my-4">Profil</h3>
                    </div>
                    <img :src="profil.image.url" class="rounded-circle mx-auto" style="width: 150px;" alt="Avatar" />
                    <div class="card-body">
                        <form @submit.prevent="profilChange" id="editProfil">
                            <div class="form-floating mb-3">
                                <input :value="profil.city" name="city" class="form-control" id="kota" type="text"
                                    placeholder="" />
                                <label for="kota">kota</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input :value="profil.name" name="name" class="form-control" id="name" type="text"
                                    placeholder="" />
                                <label for="name">name</label>
                            </div>
                            <div class="form-floating mb-3">
                                <input class="form-control" id="inputFile" type="file" placeholder="" name="image" />
                                <label for="inputFile">Ganti Foto</label>
                            </div>
                            <div class="d-grid mx-auto col-4">
                                <button class="btn btn-primary  " value="submit">Update</button>
                            </div>

                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

  
<style scoped></style>