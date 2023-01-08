<template>
  <nav v-if="this.user?.id >= 0">
    <!--<router-link to="/about">About</router-link> |-->
    <router-link to="/petition">Petition</router-link>  |
    <router-link to="/my_petition">Meine Petition</router-link>
    <span class="text-end"> <Navbar></Navbar> </span>
  </nav>
  <div class="boxing" v-else>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}
.boxing {
  margin-top: 60px;
}

.btn-sign-petition {
  margin-top: 20px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
<script>
import Navbar from '@/components/SignUser.vue'
export default {
  components: {
    Navbar
  },
  data () {
    return {
      user: {}
    }
  },
  mounted () {
    const userString = sessionStorage.getItem('user')
    const connectedUser = JSON.parse(userString)
    this.user = connectedUser
  }
}
</script>
