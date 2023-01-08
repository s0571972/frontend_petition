<template>
  <span class="loginUser">
    eingeloggt als {{this.lastName}}
  </span>
  <button @click="logOut" class="btn btn-primary"> log Out </button>

</template>

<script>
export default {
  name: 'SignUser',
  data () {
    return {
      lastName: '',
      user: {}
    }
  },
  methods: {
    logOut () {
      sessionStorage.removeItem('user')
      window.location.href = '/'
    }
  },
  mounted () {
    const userString = sessionStorage.getItem('user')
    const connectedUser = JSON.parse(userString)
    this.user = connectedUser
    this.lastName = connectedUser.lastName
  }
}
</script>

<style scoped>
.loginUser {
  margin-right: 50px;
}

</style>
