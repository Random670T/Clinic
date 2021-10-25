<template>
  <div>
    <Head />
    <div id="patients" class="container mt-3">
      <div>Patients Page</div>

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
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01">Sex</label>
          <select
            class="form-select"
            id="inputGroupSelect01"
            v-model="form.group"
          >
            <option selected>Choose...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div class="form-group mt-3">
          <input
            type="text"
            class="form-control"
            v-model="form.address"
            placeholder="Enter Address"
            required
          />
        </div>
        <br />
        <div class="form-group mt-3">
          <input
            type="text"
            class="form-control"
            v-model="form.zipcode"
            placeholder="Enter Zip Code"
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
        <div class="form-group mt-3">
          <input
            type="text"
            class="form-control"
            v-model="form.dob"
            placeholder="Enter Date Of Birth"
            required
          />
        </div>
        <br />
        <button
          type="submit"
          v-on:click="saveData" v-show="!isupDate"
          class="btn btn-success mt-3"
        >
          Submit
        </button>
        <button
          type="submit"
          v-on:click="updateRow"  v-show="isupDate"
          class="btn btn-success mt-3"
        >
          Update
        </button>
        <button
          type="button"
          v-on:click="cancelEdit"  v-show="isupDate"
          class="btn btn-secondary mt-3"
        >
          Cancel
        </button>
      </form>

        <div class="input-group mb-3">
            <input @input="checkEmpty" @keypress.enter="search" type="text" v-model="searchterm" class="form-control" placeholder="Enter data">
            <button class="btn btn-outline-secondary" type="button" @click="search" id="button-addon2">Search</button>
        </div>

      <table
        class="table table-striped mt-3 mb-5 table-responsive-sm" v-show="isData">
        <thead>
          <tr>
            <td>Name</td>
            <td>Last Name</td>
            <td>Sex</td>
            <td>Address</td>
            <td>Zip Code</td>
            <td>Phone Number</td>
            <td>Date Of Birth</td>
            <td>Actions</td>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(doc, k) in patients" :key="k">
            <td>{{ doc.name }}</td>
            <td>{{ doc.lname }}</td>
            <td>{{ doc.group }}</td>
            <td>{{ doc.address }}</td>
            <td>{{ doc.zipcode }}</td>
            <td>{{ doc.phone }}</td>
            <td>{{ doc.dob }}</td>

            <td>
              <button class="btn btn-danger" v-on:click="deleteRow(doc._id)">
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
  name: "patients",
  components: {
    Head,
  },
  data() {
    return {
      name: "Patients",
      form: {
        name: "",
        lname: "",
        group: "",
        address: "",
        zipcode: "",
        phone: "",
        dob: "",
      },
      isupDate: false,
      isData: "",
      patients: [],
       searchterm: '',
    };
  },

  methods: {
    saveData: function () {
      let $this = this;
      $.ajax({
        type: "POST",
        url: `${baseURL}/patients/save`,
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
        url: `${baseURL}/patients/list`,
        dataType: "json",
        success: function (data, status) {
          $this.patients = data;
          $this.isData = $this.patients.length > 0 ? true : false;
        },
      });
    },
    ///////// change deleteRow
    deleteRow: function (id) {
      let $this = this;
      $.ajax({
        type: "DELETE",
        url: `${baseURL}/patients/delete/${id}`,
        success: function (data, status) {
          if (status === "Deleted");
           $this.listData();
        },
      });
    },
    editRow: function (patient) {
      this.isupDate = true;
      this.form.name = patient.name;
      this.form.lname = patient.lname;
      this.form.sex = patient.sex;
      this.form.address = patient.address;
      this.form.zipcode = patient.zipcode;
      this.form.phone = patient.phone;
      this.form.dob = patient.dob;

      this.updateID = patient._id;
    },

    cancelEdit: function () {
      this.isupDate = false;
      for (let i in this.form) this.form[i] = "";
    },
    updateRow: function () {
      let $this = this;
      $.ajax({
        type: "PUT",
        url: `${baseURL}/patients/update/${this.updateID}`,
        data: this.form,
        success: function (data, status) {
          if (status === "success");
          alert("update successful");
          this.isupDate = false;
           $this.listData();
          for (let i in this.form) this.form[i] = "";
        },
      });
    },
    search: function () {
      let $this = this;
      // let param = this.searchParam;
      $.ajax({
        type: "GET",
        url: `${baseURL}/patients/search/${this.searchterm}`,

        success: function (data, status) {
          if (status === "success") $this.patients = data;
          $this.isData = $this.patients.length > 0 ? true : false;
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


