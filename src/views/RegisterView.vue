<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <h1>Registierung </h1>
      </div>
      <div class="card-body">
        <form class="text-start">

          <div class="mb-3">
            <label for ="name" class="form-label"> Name</label>
            <input type="text" class="form-control" id="name" v-model="userFirstName" required>
            <label for ="lastName" class="form-label"> Vorname</label>
            <input  type="text" multiple="true" class="form-control" v-model="userLastName" id="lastName"  required/>
          </div>
          <div class="mb-3">
            <label for ="email" class="form-label"> Email Adresse</label>
            <input  type="email" class="form-control" v-model="userEmail" id="email" required/>
          </div>

          <div class="mb-3">
            <label for ="password" class="form-label"> Passwort </label>
            <input  type="password"  class="form-control" id="password" v-model="userPassword" required/>
          </div>
          <div class="modal-footer">
            <button @click="createUser" type="submit" class="btn btn-primary"> Registrieren </button>
          </div>

        </form>
      </div>

    </div>

  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'RegisterView',
  data () {
    return {
      userLastName: '',
      userFirstName: '',
      userEmail: '',
      userPassword: ''
    }
  },
  methods: {
    createUser () {
      console.log('Hello ...')
      if (this.validation()) {
        const raw = JSON.stringify({
          lastName: this.userLastName,
          firstName: this.userFirstName,
          userPassword: this.userPassword,
          userEmail: this.userEmail,
          freeText: ''
        })

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        const requestOption = {
          method: 'POST',
          headers: headers,
          body: raw,
          redirect: 'follow'
        }

        fetch('http://localhost:8080/register_user', requestOption)
          .then(res => res.json())
          .then((result) => {
            console.log(requestOption)
            console.log(result)
            window.location.href = '/'
          })
          .catch(error => console.log(error))
      }
    },
    validation () {
      if (this.userFirstName === '') return false
      if (this.userPassword === '') return false
      if (this.userEmail === '') return false
      return true
    }
  }
}
</script>

<style scoped>

.container {
  font-family: Bahnschrift;
}

</style>
