<script setup>
import { ref } from 'vue';
import { useGlobal } from '../../stores/global';
import { useRoute } from 'vue-router';
const post = ref(null)
const { baseUrl, isAuthenticated } = useGlobal()
const globalStore = useGlobal()
const comments = ref(null)

const id = useRoute()

const getComment = async () => {
  try {
    const response = await fetch(`${baseUrl}answer/index/${id.params.id}`, {
      method: "GET",
    })
    const data = await response.json()
    if (data.status) {
      comments.value = data.messages
    } else {
      globalStore.setAlertMsg({ messages: data.messages, status: 2 })
    }
  } catch (error) {
    globalStore.setAlertMsg({ messages: e.message, status: 2 })
  }
}
getComment()

const getPost = async () => {
  try {
    const response = await fetch(`${baseUrl}question/detail/${id.params.id}`, {
      method: "GET",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json'
      }
    })
    const data = await response.json()
    if (data.status) {
      post.value = data.messages
    } else {

      globalStore.setAlertMsg({ messages: data.messages, status: 2 })
    }
  } catch (e) {
    globalStore.setAlertMsg({ messages: e.message, status: 2 })
  }
}
getPost()
const addComment = async () => {
  const form = document.getElementById('addComment')
  const submitter = document.querySelector("button[value=submit]")
  const formData = new FormData(form, submitter)
  const fileInput = document.getElementById('inputFile')
  if (fileInput.files.length > 0) {
    formData.append('file', fileInput.files[0])
  }
  try {
    const response = await fetch(`${baseUrl}answer/create`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json'
      },
      body: formData
    })
    const data = await response.json()

    if (data.status) {
      globalStore.setAlertMsg({ messages: ['berhasil mengirim comment'], status: 1 })
    } else {
      globalStore.setAlertMsg({ messages: [data.messages], status: 2 })
    }
  } catch (e) {
    globalStore.setAlertMsg({ messages: e.message, status: 2 })
  }
  getComment()
}
</script>

<template>
  <div class="container mt-3">
    <article>
      <!-- Post header-->
      <header class="mb-4">
        <!-- Post title-->
        <h1 class="fw-bolder mb-1">{{ post.title }}</h1>
        <!-- Post meta content-->
        <div class="text-muted fst-italic mb-2">Posted on January 1, 2023 by Start Bootstrap</div>
        <!-- Post categories-->
        <a class="badge bg-secondary text-decoration-none link-light" href="#!">{{ post.category.name }}</a>
      </header>
      <!-- Preview image figure-->
      <figure class="mb-4"><img class="img-fluid rounded" :src="post.image.url" alt="..." /></figure>
      <!-- Post content-->
      <section class="mb-5">
        {{ post.body }}
      </section>
    </article>
  </div>
  <div class="container">
    <div class="row d-flex justify-content-center">
      <div class="col-md-10 col-lg-8">
        <div class="card shadow-0 border" style="background-color: #f0f2f5;">
          <div  class="card-body p-4">
            <form v-if="isAuthenticated" class="form-outline mb-4" @submit.prevent="addComment" id="addComment">
              <textarea class="form-control" name="body" id="body" rows="3" placeholder="Type comment..."></textarea>
              <div class="form-floating mb-3">
                <input class="form-control" id="inputFile" type="file" placeholder="" name="image" />
                <label for="inputFile">File</label>
              </div>
              <input type="hidden" name="question_id" :value="post.id">
              <button class="btn btn-info mt-2" name="submit" value="submit">Add comment</button>
            </form>
            <div class="card mb-4" v-for="item in comments">
              <div class="card-body">
                <p>{{ item.body }}</p>
                <div class="d-flex justify-content-between">
                  <div class="d-flex flex-row align-items-center">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp" alt="avatar" width="25"
                      height="25" />
                    <p class="small mb-0 ms-2">{{ item.user.name }}</p>
                  </div>
                  <div class="d-flex flex-row align-items-center">
                    <p class="small text-muted mb-0">Upvote?</p>
                    <i class="far fa-thumbs-up mx-2 fa-xs text-black" style="margin-top: -0.16rem;"></i>
                    <p class="small text-muted mb-0">3</p>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  
<style scoped></style>