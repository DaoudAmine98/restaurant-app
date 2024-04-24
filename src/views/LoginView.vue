<template>
      <nav>
    <router-link to="/">Login</router-link>|
    <router-link to="/registre">Registre</router-link>
    
  </nav>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">
              <h3>Welcome to Restaurant application</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="username" class="form-label">Username or Email</label>
                  <input type="text" class="form-control" id="username" v-model="loginInfo.username" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="loginInfo.password" required>
                </div>
                <button type="submit" class="btn btn-primary login-button">Login</button>

              
                <p class="text-danger mt-2" v-if="error">{{ error }}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
export default {
    name: 'LoginView',
  data() {
    return {
      loginInfo: {
        username: '',
        password: ''
      },
      error: ''  
    };
  },
  methods: {
    async handleLogin() {
  this.error = ''; 
  let loginPayload = {
    password: this.loginInfo.password
  };

  // Determine if the input is an email or username
  if (this.loginInfo.username.includes('@')) {
    loginPayload.email = this.loginInfo.username;  // Send as email
  } else {
    loginPayload.username = this.loginInfo.username;  // Send as username
  }

  try {
    const response = await fetch('https://my-restaurant-api.restoamine.workers.dev/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginPayload)
    });

    const result = await response.json();

    if (!response.ok) {
      this.error = result.message;  // Display error message from server
    } else {
      this.$router.push('/home');  // Navigate to home page on successful login
    }
  } catch (err) {
    console.error('Error during login:', err);
    this.error = 'An error occurred during login.';  // Display a generic error message
  }
}
  }};
</script>

<style scoped>
.login-button {
  width: 30%;  
  float: right; 
}






</style>