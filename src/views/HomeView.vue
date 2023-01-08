<template>
  <div class="container">
    <form >
      <div class="card">
        <div class="card-header">
          <h1>Login</h1>
        </div>
        <div class="text-start card-body">
          <div class="mb-3">
            <label for ="email" class="form-label"> Email Adresse </label>
            <input  type="email" class="form-control" v-model="inputEmail" id="email" required/>
          </div>
          <div class="mb-3">
            <label for ="password" class="form-label"> Kennwort </label>
            <input  type="password"  class="form-control text_area" id="password" v-model="inputPassword"/>

            <a href="register" class="textregister"> Registieren </a>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" @click="authentification" class="btn btn-primary textspacing"> Logg in </button>
        </div>

      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'HomeView',
  data () {
    return {
      inputEmail: '',
      inputPassword: '',
      user: {}
    }
  },
  methods: {
    authentification () {
      const requestOptions = {
        method: 'GET',
        redirect: 'follow'
      }
      fetch('http://localhost:8080/user/' + this.inputEmail + '/password/' + this.inputPassword, requestOptions)
        .then(response => response.json())
        .then(result => {
          this.user = result
          // saving user to session Storage
          sessionStorage.setItem('user', JSON.stringify(result))
          if (result?.id > 0) {
            window.location.href = '/petition'
          }
        })
        .catch(error => console.log(error))
    }
  }
}
</script>

<style scoped>
.textregister {
  margin-top: 20px;
}
.textspacing {
  margin-right: 20px;
  margin-bottom: 10px;
}
.container {
  font-family: Bahnschrift;
}

</style>
