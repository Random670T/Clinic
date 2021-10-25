<template>
  <div>
    <Head />
    <div id="doctors" class="container mt-3">
       <div>Doctors Page</div>
      <form>
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
            v-model="form.lname"
            placeholder="Enter Last Name"
            required
          />
        </div>
        <br />
        <div class="form-group mt-3">
          <input
            type="tel"
            pattern="[0-9]{10}"
            class="form-control"
            v-model="form.phone"
            placeholder="Enter Phone"
            required
          />
        </div>
        <br />

        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01"
            >Speciality</label
          >
          <select
            class="form-select"
            id="inputGroupSelect01"
            v-model="form.group"
          >
            <option selected>Choose...</option>
            <option value="Internal">Internal Medicine</option>
            <option value="General">General Practioner</option>
          </select>
        </div>

        <button
          type="submit"
          v-on:click="saveData" v-show="!isupDate"
          class="btn btn-success mt-3"
        >
          Submit
        </button>
        <button
          type="button" v-show="isupDate" 
          v-on:click="updateRow"
          class="btn btn-success mt-3"
        >
          Update
        </button>
        <button
          type="button" v-show="isupDate" 
          v-on:click="cancelEdit"
          class="btn btn-secondary mt-3"
        >
          Cancel
        </button>
      </form>
      <br>
      <div class="input-group mb-3">
            <input @input="checkEmpty" @keypress.enter="search" type="text" v-model="searchterm" class="form-control" placeholder="Enter data">
            <button class="btn btn-outline-secondary" type="button" @click="search" id="button-addon2">Search</button>
        </div>


      
      <!--Table section -->
      <table class="table table-striped mt-3 mb-5 table-responsive-sm"  v-show="isData">
        <thead>
          <tr>
            <td>Name</td>
            <td>Last Name</td>
            <td>Phone</td>
            <td>Speciality</td>
            <td>Actions</td>
          </tr>
        </thead>
     
        <tbody>
          <tr v-for="(doc,k) in doctors" :key="k">
            <td>{{ doc.name }}</td>
            <td>{{doc.lname}}</td>
            <td>{{ doc.phone }}</td>
            <td>{{ doc.group }}</td>
            <td>
              <button
                class="btn btn-danger" v-on:click="deleteRow(doc._id)">
                <i class="fa fa-trash-o"></i>
              </button>
              <button class="btn btn-success" v-on:click="editRow(doc)">
                <i class="fa fa-edit"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
        <div v-show="!isData" class="Alert alert-warning mt-3">
                No Data to Show
            </div>
     
    </div>
   
  </div>
</template>
   

    <script>
import Head from "@/components/Head.vue";

export default {
  name: "doctors",
  components: {
    Head,
  },
  data() {
    return {
      name: "Doctors",
      form: {
        name: "",
        lname: "",
        phone: "",
        speciality: "",
       
      },
      isupDate: false,
      isData: "",
      doctors: [],
     searchterm: '',
      updateID: '',
     
    };
  },

  methods: {
   saveData: function () {
     
      let $this = this;
      $.ajax({
        type: "POST",
        url: `${baseURL}/doctors/save`,
        data: this.form,
        success: function (data, status) {
          if (status == "success") {
            alert("Great");
             $this.listData();
            for (let i in $this.form) $this.form[i] = "";
          }
        },
      });
    },

    listData: function () {
      let $this = this;
      $.ajax({
        type: "GET",
        url: `${baseURL}/doctors/list`,
        dataType: "json",
        success: function (data, status) {
          $this.doctors = data;
          $this.isData = $this.doctors.length > 0 ? true : false;
        },
      });
    },
    ///////// change deleteRow
    deleteRow: function (id) {
      let $this = this;
      $.ajax({
        type: "DELETE",
        url: `${baseURL}/doctors/delete/${id}`,
        success: function (data, status) {
          if (status === "Deleted");
          $this.listData();
        },
      });
    },
    editRow: function (doc) {
      this.isupDate = true;
      this.form.name = doc.name;
      this.form.lname = doc.lname;
      this.form.phone = doc.phone;
      this.form.speciality = doc.speciality;
      this.updateID = doc._id;
      
    },

    cancelEdit: function () {
      this.isupDate = false;
      for (let i in this.form) this.form[i] = "";
    },
    updateRow: function () {
     
      let $this = this;
      $.ajax({
        type: "PUT",
        url: `${baseURL}/doctors/update/${this.updateID}`,
        data: this.form,
        success: function (data, status) {
          if (status === "success");
          alert("update successful");
          $this.listData();
          this.isupDate = false;
          for (let i in $this.form) $this.form[i] = "";
        },
      });
    },
    search: function () {
      console.log("search frontend")
      let $this = this;
      //  let param = this.searchParam;
      $.ajax({
        type: "GET",
        url: `${baseURL}/doctors/search/${this.searchterm}`,
        
        success: function (data, status) {
          if (status === "success") 
          $this.doctors = data;
          $this.isData = $this.doctors.length > 0 ? true : false;
        },
      });
    },

    checkEmpty: function () {
      if (!this.searchterm) {
        this.listData();
      } else {
        this.search();
      }
    },
  },
  mounted() {
    this.listData();
  },
};
</script>




