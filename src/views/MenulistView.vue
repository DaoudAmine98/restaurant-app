<template>
  <nav>
    <router-link to="/home">Home</router-link> |
    <router-link to="/menu">Menu</router-link> |
    <router-link to="/reservation">Reservation</router-link>
  </nav>
  <div class="menu-item-view">
    <h1>{{ itemData.id ? 'Update Menu Item' : 'Add Menu Item' }}</h1>
    <form @submit.prevent="saveItem" >
      <div class="form-group">
        <input v-model="itemData.name" placeholder="Dish Name" required>
      </div>
      <div class="form-group">
        <textarea v-model="itemData.description" placeholder="Dish Description" required rows="4"></textarea>
      </div>
      <div class="form-group">
        <input v-model="itemData.price" type="number" step="0.01" placeholder="Price" required>
      </div>
      <button :class="itemData.id ? 'btn-info' : 'btn-success'" type="submit">
        {{ itemData.id ? 'Update Menu Item' : 'Add Menu Item' }}
      </button>
    </form>
  </div>
</template>


<script>
export default {
  name: 'MenulistView',
  data() {
    return {
      itemData: {
        id: null,
        name: '',
        description: '',
        price: null
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
        const response = await fetch(`https://my-restaurant-api.restoamine.workers.dev/menu/${itemId}`);
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
      const url = `https://my-restaurant-api.restoamine.workers.dev/menu/${this.itemData.id ? `${this.itemData.id}` : ''}`;
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
          this.$router.push('/menu'); 
        } else {
          alert(`Failed to ${this.itemData.id ? 'update' : 'add'} the item. Status: ${response.status}`);
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
.menu-item-view {
  
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;}

.menu-item-view h1 {
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  width: 100%;
}

input, button {
  width: 100%;
  padding: 10px;
  margin: 6px 0;
  box-sizing: border-box;
}

.btn-info {
  background-color: #17a2b8;
}

.btn-success {
  background-color: #28a745;
}
textarea {
  width: 100%;
  padding: 10px;
  margin: 6px 0;
  box-sizing: border-box;
  resize: vertical; 
}
</style>
