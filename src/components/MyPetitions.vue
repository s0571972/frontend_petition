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
            <button @click="deletedPetition(petition.id)"  type="button"  class="btn btn-danger" >
              delete
            </button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'MyPetitions',
  data () {
    return {
      petitions: []
    }
  },
  methods: {
    deletedPetition (petitionId) {
      const userString = sessionStorage.getItem('user')
      const connectedUser = JSON.parse(userString)

      const headers = new Headers()
      headers.append('Content-Type', 'application/json')

      const requestOption = {
        method: 'DELETE',
        headers: headers,
        redirect: 'follow'
      }

      fetch('http://localhost:8080/petition/' + petitionId + '/user/' + connectedUser?.id, requestOption)
        .catch(error => console.log(error))
      window.location.href = '/my_petition'
    }
  },
  mounted () {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    }
    const userString = sessionStorage.getItem('user')
    const connectedUser = JSON.parse(userString)

    fetch('http://localhost:8080/petitions/' + connectedUser.id, requestOptions)
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
