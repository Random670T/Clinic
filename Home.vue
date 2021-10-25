<template>
  <div id="home">
    <div class="container border">
      <div class="row">
        <div class="col">
          <img
            src="../assets/reception.jpg"
            alt="Background"
            class="img-fluid mt-4"
          />
        </div>
        <div class="col">
          <img
            src="../assets/healthcare.jpg"
            alt="Background"
            class="img-fluid mt-4"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <li class="nav-item">
            <router-link
              class="nav-link active"
              aria-current="page"
              to="/admin"
              >Adminstration Login</router-link
            >
          </li>
        </div>
        <div class="col">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/clinicstaff"
              >Staff Login</router-link
            >
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  height: 40vh;
  width: 90%;
}
</style>

<script>

</script>