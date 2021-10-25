
<template>
  <div id="navi">
    <header>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <router-link class="navbar-brand" to="#">Clinic</router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/">Logout</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/patients">Patients</router-link>
        </li>
          <li class="nav-item">
          <router-link class="nav-link" to="/doctors">Doctors</router-link>
        </li>
        
      </ul>
     
    </div>
  </div>
</nav>






      <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <router-link class="navbar-brand" to="/">Clinic</router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link
                  class="nav-link active"
                  aria-current="page"
                  to="/"
                  >Home</router-link
                >
              </li>
              <li class="nav-item dropdown">
                <router-link
                  class="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  to="/"
                  role="button"
                  aria-expanded="false"
                  >Patients</router-link
                >
                <ul class="dropdown-menu">
                  <li>
                    <router-link class="dropdown-item" to="/patients"
                      >Add</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="dropdown-item"
                      to="/Listpatients"
                      >List</router-link
                    >
                  </li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <router-link
                  class="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  to="/"
                  role="button"
                  aria-expanded="false"
                  >Doctors</router-link
                >
                <ul class="dropdown-menu">
                  <li>
                    <router-link class="dropdown-item" to="/doctors"
                      >Add</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="dropdown-item"
                      to="/Doctors/Listdoctors"
                      >List</router-link
                    >
                  </li>
                </ul>
              </li>

              <li class="nav-item dropdown">
                <router-link
                  class="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  to="/"
                  role="button"
                  aria-expanded="false"
                  >Appointments</router-link
                >
                <ul class="dropdown-menu">
                  <li>
                    <router-link class="dropdown-item" to="/appointments"
                      >Add</router-link
                    >
                  </li>
                  <li>
                    <router-link
                      class="dropdown-item"
                      to="/appointments/listappointments"
                      >List</router-link
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav> -->
    </header>
  </div>
</template>




