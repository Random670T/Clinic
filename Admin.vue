<template>
  <div id="admin">
    <h1>Administration Login</h1>
    <div class="container border">
      <div style="text-align: left">
        <p>Login</p>
        <form class="mt-4" id="admin-form">
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"> <i class="fas fa-user"></i></span>
            </div>
            <input
              v-model="form.username"
              type="text"
              class="form-control"
              id="username"
              placeholder="Your Username"
            />
          </div>
          <br />
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"> <i class="fas fa-key"></i></span>
            </div>
            <input
              v-model="form.password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter Password"
            />
          </div>
          <br />
          <div class="form-check">
            <input
              v-model="form.rem"
              class="form-check-input"
              type="checkbox"
              value=""
              id="rememberMe"
            />Remember Me
            <label class="form-check-label" for="Rem"> </label>
          </div>
          <br />

          <button type="button" class="btn btn-primary" v-on:click="logIn">
            Login
          </button>
          <router-link class="nav-link" to="/adminreg">Sign Up</router-link>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "admin",
  data() {
    return {
      form: {
        username: "",
        password: "",
        rem: "",
      },
      searchterm: "",
      isData: true,
      name: "Admin",
    };
  },

  methods: {
    logIn() {
      let $this = this;
      
      $.ajax({
        type: "GET",
        url: `${baseURL}/admin/search/:term${this.form.password}`,
        success: function (data, status) {
          if (status === "success") {
            $this.admin = data;
            $this.isData = $this.admin.length > 0 ? true : false;
            $this.checkEmpty();
          }
        },
      });
    },
    checkEmpty: function () {
      if (!this.searchterm) {
        this.$router.push("/main");
      } else {
        this.search();
      }
    },
    
  },
};


</script>


