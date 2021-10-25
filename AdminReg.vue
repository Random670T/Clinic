<template>
  <div>
    <h1>Registration Page</h1>

    <div class="container border">
      <form action="">
        <div class="form-group mt-3">
          <input
            type="text"
            class="form-control"
            v-model="form.name"
            placeholder="Enter Name"
            required
          />
        </div>
        <br />
        <div class="form-group mt-3">
          <input
            type="text"
            class="form-control"
            v-model="form.username"
            placeholder="Enter User Name"
            required
          />
        </div>
        <br />
        <div class="form-group mt-3">
          <input
            type="email"
            class="form-control"
            v-model="form.email"
            placeholder="Enter Email Address"
            required
          />
        </div>
        <br />

        <div>
          <input
            v-model="form.password"
            type="password"
            class="form-control"
            id="password"
            placeholder="Enter Password"
          />
        </div>
        <button
          type="submit"
          v-on:click="saveStaff"
          class="btn btn-success mt-3"
        >
          Submit
        </button>
      </form>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "adminreg",
  data() {
    return {
      form: {
        name: "",
        username: "",
        email: "",
        password: "",
      },
      isupDate: false,
      isData: "",
      admin: [],
    };
  },
  methods: {
    saveStaff() {
      let $this = this;
      $.ajax({
        type: "POST",
        url: `${baseURL}/admin/save`,
        data: this.form,
        success: function (data, status) {
          if (status == "success") {
            alert("Great");
           
            for (let i in $this.form) $this.form[i] = "";
          }
        },
      });
    
    }
  }
};
</script>