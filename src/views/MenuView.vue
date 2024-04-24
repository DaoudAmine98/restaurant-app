<template>
    <div>
      <nav>
        <router-link to="/home">Home</router-link> |
        <router-link to="/menu">Menu</router-link> |
        <router-link to="/reservation">Reservation</router-link>
      </nav>
  
      <div class="menu-view">
        <h1>Menu</h1>
        <div class="controls">
          <button class="btn btn-success" @click="navigateToAdd()">Add Menu</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th style="width: 20%;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in items" :key="item.id">
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>{{ item.price }}</td>
              <td>
                <button class="btn btn-info me-2" @click="navigateToUpdate(item.id)">Edit</button>
                <button class="btn btn-danger" @click="deleteItem(item.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2'; 
  export default {
    name: 'MenuView',
    data() {
      return {
        items: [],
        selectedItem: null
      };
    },
    mounted() {
      this.fetchItems();
    },
    methods: {
        navigateToUpdate(id) {
      this.$router.push({ name: 'updateMenu', params: { id } });
    },
    
        navigateToAdd() {
      this.$router.push({ name: 'addMenu' });
    },
      async fetchItems() {
        try {
          const response = await fetch('https://my-restaurant-api.restoamine.workers.dev/menu', {
            method: 'GET'
          });
          if (response.ok) {
            this.items = await response.json();
          } else {
            console.error('Failed to fetch items:', response.status);
            alert('Failed to fetch items');
          }
        } catch (error) {
          console.error('Error fetching items:', error);
          alert('Error fetching items');
        }
      },
   
      async deleteItem(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.confirmDelete(id);
        }
      });
    },
    async confirmDelete(id) {
      try {
        const response = await fetch(`https://my-restaurant-api.restoamine.workers.dev/menu/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        });

        if (response.ok) {
          Swal.fire(
            'Deleted!',
            'Your item has been deleted.',
            'success'
          );
          this.fetchItems(); 
        } else {
          Swal.fire(
            'Failed!',
            'Failed to delete the item.',
            'error'
            
          );
        }
      } catch (error) {
        Swal.fire(
          'Error!',
          'An error occurred while deleting the item.',
          'error'
        );
      }
    }
  }
}
  </script>
  
  <style scoped>
.menu-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
  max-width: 90%;
}

.menu-view h1 {
  text-align: center;
  width: 100%;
}

.controls {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 10px;
}

.menu-view table {
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
}

.menu-view th, .menu-view td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.menu-view th {
  background-color: #f4f4f4;
}

.btn {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  min-width: 120px;
  text-align: center;
}
</style>
