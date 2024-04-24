<template>
   <nav>
    <router-link to="/home">Home</router-link>|
    <router-link to="/menu">Menu</router-link>|
    <router-link to="/reservation">Reservation</router-link>
  </nav>
  <div class="home">
    <div class="hero-banner">
      <img :src="imageUrl" alt="Elegant dining table setup to welcome guests" class="banner-image">
      <div class="content">
        <h1>Welcome to Restaurant Application</h1>
        <p class="description">Your gateway to a memorable dining experience.</p>
        <div class="buttons">
          <router-link to="/reservation" class="button reservation">View Reservations</router-link>
          <router-link to="/menu" class="button menu">View Menu</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      imageUrl: require('@/assets/Home.jpg')
    };
  }
}
</script>
<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  overflow: hidden;
}
.hero-banner {
  text-align: center;
  position: relative;
  width: 100vw; 
  height: 100vh; 
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-banner img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover; 
  opacity: 0.8;
  transition: opacity 0.3s ease;
}
.hero-banner img:hover {
  opacity: 1;
}
.content {
  position: absolute;
  z-index: 10; 
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
}
h1 {
  font-size: 2.5rem;
  margin: 0;
  padding: 20px;
  font-weight: 600;
  text-transform: uppercase;
  font-family: 'Montserrat', sans-serif;
}
.description {
  font-size: 1.2rem;
  line-height: 1.8;
  margin: 20px auto;
  padding: 10px;
  font-family: 'Open Sans', sans-serif;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
}
.button {
  padding: 12px 24px;
  background-color: #fa923f;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, background-color 0.3s;
}
.button:hover {
  transform: translateY(-2px);
  background-color: #18c982f5;
}
.reservation {
  background-color: #ff7e67;
}
.menu {
  background-color: #ff7e67;
}
</style>
