<template>

  <div class="container-lg" style="font-family: Bahnschrift">
    <div class="row">
      <div class="col-6" v-for="petition in petitions" :key="petition.id">
        <div class="card text-right"  style="border-radius: 20px; min-height: 250px; margin-bottom: 10px">
          <h5 class="card-header">{{ petition.petitionName }}</h5>
          <div class="card-body">
            <p class="card-header">{{petition.petitionDate}}</p>
            <p class="card-text" style="margin-top: 20px">{{petition.petitionTheme}}</p>
            <!-- Button trigger modal -->

            <button @click="selectedPetition( petition.petitionName, petition.id)" type="button"  class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Unterschreiben eine petition
            </button>

            <button @click="linkSign(petition.id)" class="btn btn-primary btn-sign-petition ">
              Ansicht der unterbeschreiben Petition
            </button>
            <!-- Modal -->
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{ this.selectedPetitionName }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <form class="text-start">
                    <div class="modal-body">
                      <div class="mb-3">
                        <label for ="name" class="form-label"> Name</label>
                        <input type="text" class="form-control" id="name" v-model="inputUserFirstName" required>
                        <label for ="lastName" class="form-label"> Vorname</label>
                        <input  type="text" multiple="true" class="form-control" v-model="inputUserLastName" id="lastName"  required/>
                      </div>
                      <div class="mb-3">
                        <label for ="email" class="form-label"> Email Adresse</label>
                        <input  type="email" class="form-control" v-model="inputUserEmail" id="email" required/>
                      </div>

                      <div class="mb-3">
                        <label for ="freeText" class="form-label"> Ich unterschreibe, weil ... (freiwillige information)</label>
                        <textarea  type="text" multiple="true" class="form-control text_area" id="freeText" v-model="inputUserFreeText"/>
                      </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">schliessen</button>
                    <button type="submit" @click="signPetition" class="btn btn-primary"> unterschreiben </button>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>

  <AddPetition></AddPetition>

</template>

<script>

import AddPetition from '@/components/AddPetition.vue'
export default {
  name: 'PetitionView',
  components: {
    AddPetition
  },
  data () {
    return {
      petitions: [],
      inputPetitionName: '',
      inputUserFirstName: '',
      inputUserLastName: '',
      inputUserFreeText: '',
      inputUserEmail: '',
      inputUserPassword: '',
      selectedPetitionId: 0,
      selectedPetitionName: '',
      user: {}
    }
  },
  methods: {
    selectedPetition (name, id) {
      this.selectedPetitionId = id
      this.selectedPetitionName = name
      const userString = sessionStorage.getItem('user')
      this.user = JSON.parse(userString)
      this.inputUserFirstName = this.user.firstName
      this.inputUserEmail = this.user.userEmail
      this.inputUserLastName = this.user.lastName
    },
    signPetition () {
      const raw = JSON.stringify({
        petition: {
          id: this.selectedPetitionId
        },
        userPetition: {
          id: this.user.id
        },
        freeText: this.inputUserFreeText
      })

      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      const requestOption = {
        method: 'POST',
        headers: headers,
        body: raw,
        redirect: 'follow'
      }

      fetch('http://localhost:8080/user_petition', requestOption)
        .then(res => res.json())
        .then((result) => {
          console.log(requestOption)
          window.location.href = '/petition'
        })
        .catch(error => console.log(error))
    },
    linkSign (selectedId) {
      window.location.href = '/sign_petition?id=' + selectedId
    }
  },
  mounted () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }

    fetch('http://localhost:8080/petitions', requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(petition => {
        this.petitions.push(petition)
      }))
      .catch(error => console.log(error))
  }

}
</script>
<style scoped>

</style>
