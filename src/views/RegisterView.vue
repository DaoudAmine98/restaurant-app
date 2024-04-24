<template>
     <nav>
    <router-link to="/">Login</router-link>|
    <router-link to="/registre">Registre</router-link>
    
  </nav>
    <div class="container mt-1">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3>Register New Account</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="addCompte">
                <div class="mb-3">
                  <label for="lastName" class="form-label">Last Name</label>
                  <input type="text" class="form-control" id="lastName" v-model="compteData.nom" required>
                </div>
                <div class="mb-3">
                  <label for="firstName" class="form-label">First Name</label>
                  <input type="text" class="form-control" id="firstName" v-model="compteData.prenom" required>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" v-model="compteData.email" required>
                </div>
                <div class="mb-3">
                <label for="username" class="form-label">Username</label>
                <input type="text" class="form-control" id="username" v-model="compteData.username" required>
                <p class="text-danger mt-2" v-if="usernameFormatError">Username cannot contain '@'</p>
                    </div>

                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="compteData.password" required>
                </div>
                <div class="mb-3">
                  <label for="confirmPassword" class="form-label">Confirm Password</label>
                  <input type="password" class="form-control" id="confirmPassword" v-model="passwordConfirm" required>
                </div>
                <button type="submit" class="btn btn-primary register-button">Register</button>
                <p class="text-danger mt-2" v-if="passwordMismatchError">Passwords do not match. Please try again.</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  

  <script>
  export default {
    name: 'RegisterView',
    data() {
      return {
        compteData: {
          nom: '',
          prenom: '',
          email: '',
          username: '',
          password: ''
        },
        passwordConfirm: '',
        passwordMismatchError: false,
        usernameFormatError: false  
      };
    },
    methods: {
      async addCompte() {
        
        if (this.compteData.username.includes('@')) {
          this.usernameFormatError = true;
          alert('Username cannot contain "@"');
          return; 
        } else {
          this.usernameFormatError = false; 
        }
  
        if (this.compteData.password !== this.passwordConfirm) {
          this.passwordMismatchError = true; 
          return;
        }
        this.passwordMismatchError = false; 
  
        try {
          const response = await fetch('https://my-restaurant-api.restoamine.workers.dev/registre', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.compteData)
          });
  
          if (response.ok) {
            alert('Account registered successfully!');
            this.$router.push('/'); 
          } else {
            const errorResponse = await response.json();
            alert(`Failed to register account: ${errorResponse.message}`);
          }
        } catch (error) {
          alert(`Error registering account: ${error.message}`);
        }
      }
    }
  }
  </script>
  

  <style scoped>
  .register-button {
    width: 30%;  
    float: right; 
  }
  
  
  
  
  
  
  </style>
