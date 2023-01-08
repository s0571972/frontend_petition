<template>
  <div class="container">
    <h3>
     {{this.petition.petitionName}}
    </h3>
    <h6>
      Liste der Benutzer Unterzeichnete Petitionen
      <span> Total : {{this.usersPetition.length}}</span>
    </h6>
    <table class="table table-striped">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">LastName</th>
        <th scope="col">Email</th>
        <th scope="col">FreeText</th>
      </tr>
      </thead>
      <tbody>
      <tr  v-for="user in usersPetition" :key="user?.user?.id">
        <th scope="row">{{ user?.user?.id }}</th>
        <td>{{user?.user?.firstName }}</td>
        <td>{{user?.user?.lastName}}</td>
        <td>{{user?.user?.userEmail}}</td>
        <td>{{user?.freeText}}</td>
      </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'SignPetition',
  data () {
    return {
      usersPetition: [],
      signPetitions: [],
      petition: {}
    }
  },
  mounted () {
    const urlParams = new URLSearchParams(window.location.search)
    const petitionId = parseInt(urlParams.get('id'))
    console.log(petitionId)

    const headers = new Headers()
    headers.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      id: petitionId
    })

    const requestOptions = {
      method: 'POST',
      redirect: 'follow',
      headers: headers,
      body: raw
    }

    fetch('http://localhost:8080/user_petition_id', requestOptions)
      .then(response => response.json())
      .then(result => result.forEach(signPetition => {
        const user = {
          user: signPetition.userPetition,
          freeText: signPetition.freeText
        }
        this.usersPetition.push(user)
        this.petition = signPetition.petition
      }))
      .catch(error => console.log(error))
    console.log(this.petition.name)
    console.log(this.usersPetition)
  }
}
</script>

<style scoped>

</style>
