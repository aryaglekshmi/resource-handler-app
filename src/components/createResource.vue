<template>
  <div class="container">
    <h1>{{ editData?.id ? 'Edit Resource' : 'Create Resource' }}</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="userId">User ID:</label>
        <input type="number" id="userId" v-model="formData.userId" required />
      </div>
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="formData.title" required />
      </div>
      <div>
        <label for="description">Description:</label>
        <textarea
          id="description"
          v-model="formData.description"
          required
        ></textarea>
        <button v-if="editData?.id " type="submit">Update Resource</button>
        <button v-if="!editData.id" type="submit">Create Resource</button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ['editData'],
  data() {
    return {
      formData: {
        userId: null,
        title: '',
        description: '',
      },
    }
  },
  methods: {
    async submitForm() {
      if (this.editData?.id) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${this.editData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        })
        if (response.ok) {
          window.alert('Resource updated successfully!');
          this.$emit('updated', this.formData)
        }
      } else {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        })
        if (response.ok) {
          window.alert('Resource added successfully!');
          this.formData = {
            userId: null,
            title: '',
            description: '',
          }
        }
      }
    }
  },
  mounted() {
    if (this.editData) {
      this.formData = {
        userId: this.editData.userId,
        title: this.editData.title,
        description: this.editData.body,
      }
    }
  },
}
</script>
<style scoped>
h1 {
  text-align: left;
}
form {
  width: 50%;
  text-align: left;
}
input, textarea  {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  background-color: #333;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 5px;
}
</style>
