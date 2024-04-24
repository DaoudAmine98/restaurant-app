<template>
      <nav>
    <router-link to="/home">Home</router-link>|
    <router-link to="/menu">Menu</router-link>|
    <router-link to="/reservation">Reservation</router-link>
  </nav>
    <div class="reservation-view">
      <h1>Reservations</h1>
      <div class="controls">
      <button class="btn btn-success me-2" @click="navigateToAdd()">Add Reservation
                </button></div>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Phone</th>
            <th>Table</th>
            <th>Date</th>
            <th style="width: 20%;">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.client }}</td>
            <td>{{ item.telephone }}</td>
            <td>{{ item.table }}</td>
            <td>{{ item.date }}</td>
            
          
            <td>
               
                <button class="btn btn-info me-2" @click="navigateToUpdate(item.id)"> Edit
                </button>
                <button class="btn btn-danger" @click="deleteItem(item.id)"> Delete
                </button>
            </td>   
          </tr>
        </tbody>
      </table>
   
    </div>
  </template>
  
  <script>
  import Swal from 'sweetalert2'; 
  export default {
    name: 'ReservationView',
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
      this.$router.push({ name: 'upadteReservation', params: { id } });
    },
    
        navigateToAdd() {
      this.$router.push({ name: 'addReservation' });
    },
      async fetchItems() {
        try {
          const response = await fetch('https://my-restaurant-api.restoamine.workers.dev/reservation', {
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
        const response = await fetch(`https://my-restaurant-api.restoamine.workers.dev/reservation/${id}`, {
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
  .reservation-view {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px auto; 
  max-width: 90%; 
  }
  .reservation-view table {
    margin-top: 20px;
    width: 100%;
    border-collapse: collapse;
   
  }
  
  .reservation-view th, .reservation-view td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
 
  }
  .reservation-view th {
    background-color: #f4f4f4;
  }
  .btn {
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  min-width: 120px;
  text-align: center;
}
.controls {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 10px;
}

  </style>
  