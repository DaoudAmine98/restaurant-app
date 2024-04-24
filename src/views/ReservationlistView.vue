<template>
   <nav>
        <router-link to="/home">Home</router-link> |
        <router-link to="/menu">Menu</router-link> |
        <router-link to="/reservation">Reservation</router-link>
      </nav>
  <div class="reservation-form-view">
    <h1>{{ itemData.id ? 'Update Reservation' : 'Add Reservation' }}</h1>
    <form @submit.prevent="saveItem">
      <input v-model="itemData.client" placeholder="Client's Name" required>
      <input v-model="itemData.telephone" type="tel" placeholder="Client's Telephone" required>
      <input v-model="itemData.table" type="number" placeholder="Table Number" required>
      <input v-model="itemData.date" type="datetime-local" required>
      <button :class="{ 'btn-info': itemData.id, 'btn-success': !itemData.id }" type="submit">
        {{ itemData.id ? 'Update Reservation' : 'Add Reservation' }}
      </button>
    </form>
  </div>
</template>


<script>
export default {
  name: 'ReservationlistView',
  data() {
    return {
      itemData: {
        id: null,
        client: '',
        telephone:'',
        table:'',
       date:''
      }
    };
  },
  props: ['id'],
  mounted() {
    
    this.fetchItemData(this.id);
  },

  methods: {
    
    async fetchItemData(itemId) {
      try {
        const response = await fetch(`https://my-restaurant-api.restoamine.workers.dev/reservation/${itemId}`);
        if (response.ok) {
          this.itemData = await response.json();
        } else {
          console.error('Failed to fetch item:', response.status);
        }
      } catch (error) {
        console.error('Error fetching item data:', error);
      }
    },
    async saveItem() {
      const url = `https://my-restaurant-api.restoamine.workers.dev/reservation/${this.itemData.id ? `${this.itemData.id}` : ''}`;
      const method = this.itemData.id ? 'PUT' : 'POST';

      try {
        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.itemData)
        });

        if (response.ok) {
          alert(this.itemData.id ? 'Item updated successfully!' : 'Item added successfully!');
          this.$router.push('/reservation'); 
        } else {
            const errorResponse = await response.json(); 
      alert(errorResponse.message); 
        }
      } catch (error) {
        alert(`Error ${this.itemData.id ? 'updating' : 'adding'} item: ${error}`);
      }
    }
  },
  created() {
    const itemId = this.$route.params.id;
    if (itemId) {
      this.fetchItemData(itemId);
    }
  }
}
</script>

<style scoped>
.reservation-form-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.reservation-form-view form {
  width: 100%;
}

input, button {
  width: 100%;
  padding: 8px;
  margin: 6px 0;
  box-sizing: border-box;
}

.btn-info {
  background-color: #17a2b8;
}

.btn-success {
  background-color: #28a745;
}
</style>
