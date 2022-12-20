<template>

  <div class="container-lg" style="font-family: Bahnschrift">
    <div class="row">
      <div class="col-6" v-for="petition in petitions" :key="petition.id">
        <div class="card text-right"  style="border-radius: 20px; min-height: 250px; margin-bottom: 10px">
          <h5 class="card-header">{{ petition.petitionName }}</h5>
          <div class="card-body">
            <p class="card-header">{{petition.petitionDate}}</p>
            <p class="card-text" style="margin-top: 20px">{{petition.petitionTheme}}</p>
            <span class="alert-danger" style="margin-right: 20px"> Petition duration : {{petition.petitionDuration}} day </span>
            <a href="#" class="btn btn-primary align-content-lg-end">Sign a petition </a>

          </div>
        </div>

      </div>

    </div>

  </div>

</template>

<script>

export default {
  name: 'PetitionView',
  data () {
    return {
      petitions: []
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
