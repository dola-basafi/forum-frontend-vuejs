<script setup>
import { ref } from 'vue';
import { useGlobal } from '../../stores/global';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
const post = ref({})
const { baseUrl, isAuthenticated, user } = storeToRefs(useGlobal())
const globalStore = useGlobal()
const comments = ref(null)
const commentEdit = ref({ body: '', image: '', id: null })

const id = useRoute()

const setCommentEdit = (body, image, id) => {
  commentEdit.value = { body: body, image: image, id: id }
}

const deleteComment = async (id) =>{
  
  try {
    const response = await fetch(`${baseUrl.value}answer/delete/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json'
      }
    })
    const data = await response.json()
    if (data.status) {
      getComment()      
    } else {
      globalStore.setAlertMsg({ messages: data.messages, status: 2 })
    }
  } catch (e) {
    globalStore.setAlertMsg({ messages: e.message, status: 2 })
  }
}

const editComment = async () => {  
  const form = document.getElementById('editComment')
  const submitter = document.querySelector("button[value=edit]")
  const formData = new FormData(form, submitter)
  const fileInput = document.getElementById('inputFileEdit')
  if (fileInput.files.length > 0) {
    formData.append('file', fileInput.files[0])
  }
  try {     

    const response = await fetch(`${baseUrl.value}answer/update/${commentEdit.value.id}`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json, text/plain, */*'
      },
      body: formData
    })
    const data = await response.json()
    if (data.status) {
      commentEdit.value =  { body: '', image: '', id: null }
      getComment()
    } else {
      globalStore.setAlertMsg({ messages: data.messages, status: 2 })
    }
  } catch (e) {
    globalStore.setAlertMsg({ messages: [e.message], status: 2 })
  }

}


const getComment = async () => {
  try {
    const response = await fetch(`${baseUrl.value}answer/index/${id.params.id}`, {
      method: "GET",
    })
    const data = await response.json()
    if (data.status) {
      comments.value = data.messages
    } else {
      globalStore.setAlertMsg({ messages: data.messages, status: 2 })
    }
  } catch (error) {
    globalStore.setAlertMsg({ messages: [e.message], status: 2 })
  }
}
getComment()

const getPost = async () => {
  try {
    const response = await fetch(`${baseUrl.value}question/detail/${id.params.id}`, {
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
    const response = await fetch(`${baseUrl.value}answer/create`, {
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
    globalStore.setAlertMsg({ messages: [e.message], status: 2 })
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
        <div class="text-muted fst-italic mb-2">di posting : {{ post.created_at }}</div>
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
  
  <!-- Modal -->
  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" tabindex="-1" role="dialog"
    aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="staticBackdropLabel">Edit comment</h5>
          <button class="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form v-if="isAuthenticated" class="form-outline mb-4" @submit.prevent="editComment" id="editComment">
            <textarea class="form-control" name="body" id="body" rows="3"
              placeholder="Type comment..." v-model="commentEdit.body"></textarea>
            <div class="form-floating mb-3">
              <input class="form-control" id="inputFileEdit" type="file" placeholder="" name="image" />
              <label for="inputFile">File</label>
            </div>
            <input type="hidden" name="question_id" :value="post.id">
            <button class="btn btn-info mt-2" name="submit" value="edit">Edit comment</button>
          </form>
        </div>
        <div class="modal-footer"><button class="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
<!-- comment -->
  <div class="container mb-5">
    <div class="row d-flex justify-content-center">
  <!-- add comment -->
      <div class="col-md-10 col-lg-8">
        <div class="card shadow-0 border" style="background-color: #f0f2f5;">
          <div class="card-body p-4">
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
                <div class="overflow-auto">
                  <img :src="item.image.url" alt="" >
                </div>
                <div class="d-flex justify-content-between">
                  <div class="d-flex flex-row align-items-center overflow-auto">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(4).webp" alt="avatar" width="25"
                      height="25" />
                    <p class="small mb-0 ms-2 overflow-auto">{{ item.user.name }} </p>
                    <div class="float-end d-flex" v-if="item.user.id === user.id">
                      <button class="btn btn-info ms-2 " data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                        @click="setCommentEdit(item.body, item.image.url, item.id)">edit</button>
                      <button class="btn btn-danger  ms-1 me-2 " @click="deleteComment(item.id)">delete</button>
                    </div>
                  </div>
                  <!-- <div class="d-flex flex-row align-items-center">
                    <p class="small text-muted mb-0">Upvote?</p>
                    <i class="far fa-thumbs-up mx-2 fa-xs text-black" style="margin-top: -0.16rem;"></i>
                    <p class="small text-muted mb-0">3</p>
                  </div> -->
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