<script setup>
import { storeToRefs } from 'pinia';
import { useGlobal } from '../../stores/global';
import router from '../../router';


const { getCategories, baseUrl } = storeToRefs(useGlobal())
const storeGlobal = useGlobal()
const create = async () => {
  const form = document.getElementById('questionCreate')
  const submitter = document.querySelector("button[value=submit]")
  const formData = new FormData(form, submitter)
  const fileInput = document.getElementById('inputFile')
    if (fileInput.files.length > 0) {
        formData.append('file', fileInput.files[0])
    }
  try {
    const response = await fetch(`${baseUrl.value}question/create`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json'
      },
      body: formData
    })
    const data = await response.json()
    if (data.status) {
      storeGlobal.setAlertMsg({ messages: ['berhasil post pertanyaan'], status: 1 })
      router.push({name:'question-own'})
    } else {
      storeGlobal.setAlertMsg({ messages: data.messages, status: 2 })
    }
  } catch (e) {
    storeGlobal.setAlertMsg({ messages: data.messages, status: 2 })
  }
}


</script>

<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-lg border-0 rounded-lg mt-5">
          <div class="card-header">
            <h3 class="text-center font-weight-light my-4">Buat Petanyaan</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="create" id="questionCreate">
              <div class="form-floating mb-3">
                <input class="form-control" id="judul" type="text" placeholder="judul" name="title" />
                <label for="judul">Judul</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" id="isi" type="text" placeholder="Isi" name="body"/>
                <label for="isi">Isi</label>
              </div>
              <div class="form-floating ">
                <select class="form-select" aria-label="Default select example" id="kategori" name="category_id">
                  <option v-for="item in getCategories" :value="item.id">{{ item.name }}</option>

                </select>
                <label for="kategori">Kategori</label>
              </div>
              <div class="form-floating mb-3">
                <input class="form-control" id="inputFile" type="file" placeholder="" name="image" />
                <label for="inputFile">File</label>
              </div>
              <div class="d-grid mx-auto col-4 mt-3">
                <button class="btn btn-primary  " value="submit">Posting</button>
              </div>

            </form>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

  
<style scoped></style>