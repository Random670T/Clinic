<template>
  <div>
    <h1>Appointments Page</h1>
    <!-- <Head /> -->
    <div id="appointments" class="container mt-3">
     

      <form>
        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01"
            >Location</label
          >
          <select
            class="form-select"
            id="inputGroupSelect01"
            v-model="form.location"
          >
            <option selected>Choose...</option>
            <option value="Room 101">Room 101</option>
            <option value="Room 102">Room 102</option>
            <option value="Room 103">Room 103</option>
            <option value="Room 104">Room 104</option>
          </select>
        </div>

        <div class="form-group mt-3">
          <input
            type="text"
            class="form-control"
            v-model="form.doctor"
            placeholder="Enter Doctors Name"
            required
          />
        </div>
        <br />
        <div class="form-group mt-3">
          <input
            type="text"
            class="form-control"
            v-model="form.patient"
            placeholder="Enter Patient Name"
            required
          />
        </div>
        <br />
        <div class="form-group mt-3">
          <input
            type="date"
            class="form-control"
            v-model="form.date"
            placeholder="Enter Date"
            required
          />
        </div>
        <br />
        <div class="form-group mt-3">
          <input
            type="time"
            class="form-control"
            v-model="form.time"
            placeholder="Enter Time"
            required
          />
        </div>

        <div class="input-group mb-3">
          <label class="input-group-text" for="inputGroupSelect01"
            >Status</label
          >
          <select
            class="form-select"
            id="inputGroupSelect01"
            v-model="form.status"
          >
            <option selected>Choose...</option>
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="Delayed">Delayed</option>
            <option value="Missed">Missed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <button type="submit"  v-on:click="saveData" v-show="!isupDate" class="btn btn-success mt-3">
          Submit
        </button>
        <button
          type="button"
          v-show="isupDate"
          @click="updateRow"
          class="btn btn-success mt-3"
        >
          Update
        </button>
        <button
          type="button"
          v-show="isupDate"
          @click="cancelEdit"
          class="btn btn-secondary mt-3"
        >
          Cancel
        </button>
      </form>
      <br />
  <div class="input-group mb-3">
            <input @input="checkEmpty" @keypress.enter="search" type="text" v-model="searchterm" class="form-control" placeholder="Enter data">
            <button class="btn btn-outline-secondary" type="button" @click="search" id="button-addon2">Search</button>
        </div>


      
      <!--Table section -->
      <table class="table table-striped mt-3 mb-5 table-responsive-sm"  v-show="isData">
        <thead>
          <tr>
            <td>Location</td>
            <td>Doctor</td>
            <td>Patients Name</td>
            <td>Date</td>
            <td>Time</td>
            <td>Status</td>
            <td>Actions</td>
          </tr>
        </thead>
     
        <tbody>
          <tr v-for="(doc,k) in appointments" :key="k">
            <td>{{ doc.location }}</td>
            <td>{{doc.doctor}}</td>
            <td>{{ doc.patient }}</td>
            <td>{{ doc.date }}</td>
            <td>{{doc.time}}</td>
            <td>{{doc.status}}</td>
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
  name: "appointments",
  components: {
    Head,
  },
  data() {
    return {
      name: "Appointments",
      form: {
        location: "",
        doctor: "",
        patient: "",
        date: "",
        time: "",
       
      },
      isupDate: false,
      isData: "",
       appointments: [],
        searchterm: '',
        updateID: '',
    };
  },

  methods: {
    saveData: function () {
     
      let $this = this;
      $.ajax({
        type: "POST",
        url: `${baseURL}/appointments/save`,
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
        url: `${baseURL}/appointments/list`,
        dataType: "json",
        success: function (data, status) {
          $this.appointments = data;
          $this.isData = $this.appointments.length > 0 ? true : false;
        },
      });
    },
    /////////// change deleteRow
    deleteRow: function (id) {
      let $this = this;
      $.ajax({
        type: "DELETE",
        url: `${baseURL}/appointments/delete/${id}`,
        success: function (data, status) {
          if (status === "Deleted");
           $this.listData();
        },
      });
    },
    editRow: function (appointment) {
      this.isupDate = true;
      this.form.location =appointment.location;
      this.form.doctor = appointment.doctor;
      this.form.patient = appointment.patient;
      this.form.date = appointment.date;
      this.form.time = appointment.time;
      this.updateID = appointment._id;
    },

    cancelEdit: function () {
      this.isupDate = false;
      for (let i in this.form) this.form[i] = "";
    },
    updateRow: function () {
      let $this = this;
      $.ajax({
        type: "PUT",
        url: `${baseURL}/appointments/update/${this.updateID}`,
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
      let $this = this;
      // let param = this.searchParam;
      $.ajax({
        type: "GET",
        url: `${baseURL}/appointments/search/${this.searchterm}`,

        success: function (data, status) {
          if (status === "success") $this.appointments = data;
          $this.isData = $this.appointments.length > 0 ? true : false;
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