<template>
  <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">  Add Petition <img class="imageBox" src="../assets/add.png"/> </button>
  <div class="offcanvas offcanvas-end" style="font-family: Bahnschrift" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header petition_header">
      <h5 id="offcanvasRightLabel">Anlegen neuer Petition !</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <form class="text-start">
        <div class="mb-3">
          <label for ="petitionName" class="form-label"> Bitte geben Sie eine Petition Name</label>
          <input type="text" class="form-control" id="petitionName" v-model="petitionName" required>
        </div>
        <div class="mb-3">
          <label for ="petitionTheme" class="form-label"> Bitte geben Sie eine Petition Theme </label>
          <textarea  type="text" multiple="true" class="form-control text_area" id="petitionTheme" v-model="petitionTheme" required/>
        </div>
        <div class="mb-3">
          <label for ="petitionDate" class="form-label"> Bitte Wann sollen die Petition Anfangen </label>
          <input  type="date" class="form-control" id="petitionDate" v-model="petitionDate" required/>
        </div>
        <div class="mb-3">
          <label for ="petitionDuration" class="form-label"> Bitte geben Sie Anzahl Tage der Petition </label>
          <input  type="number" class="form-control" id="petitionDuration" v-model="petitionDuration"/>
        </div>

        <div class="mb-5">
          <button  @click="createPetition" class="btn btn-primary"> Create
          </button>

        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddPetition',
  data () {
    return {
      petitionName: '',
      petitionTheme: '',
      petitionDate: new Date().getDate(),
      petitionDuration: 1
    }
  },
  methods: {
    createPetition () {
      if (this.validation()) {
        const userString = sessionStorage.getItem('user')
        const connectedUser = JSON.parse(userString)
        const raw = JSON.stringify({
          petitionName: this.petitionName,
          petitionTheme: this.petitionTheme,
          petitionDate: this.petitionDate,
          petitionDuration: this.petitionDuration,
          userId: connectedUser?.id
        })

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        const requestOption = {
          method: 'POST',
          headers: headers,
          body: raw,
          redirect: 'follow'
        }

        fetch('http://localhost:8080/petition', requestOption)
          .catch(error => console.log(error))
      }
    },
    validation () {
      if (this.petitionName === undefined) return false
      if (this.petitionTheme === undefined) return false
      if (this.petitionDate === undefined) return false
      return true
    }
  }
}
</script>

<style scoped>

.imageBox {
  max-width: 20px;
  min-height: 30px;
  max-width: 30px;

}
.petition_header {
  margin-top: 10px;
}
.text_area {
  min-height: 100px;
}

</style>
