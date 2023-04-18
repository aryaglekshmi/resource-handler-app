<template>
  <div class="page-not-found">
    <h1>404</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <router-link to="/">Go to Home</router-link>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'PageNotFound'
}
</script>

<style>
.page-not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f8f8f8;
  font-family: Arial, sans-serif;
}

.page-not-found h1 {
  font-size: 10rem;
  margin-bottom: 0;
}

.page-not-found p {
  font-size: 2rem;
  margin-top: 0;
}

.page-not-found router-link {
  margin-top: 2rem;
  font-size: 1.5rem;
  text-decoration: none;
  color: #333;
  border: 2px solid #333;
  border-radius: 5px;
  padding: 1rem;
  transition: all 0.2s ease-in-out;
}

.page-not-found router-link:hover {
  background-color: #333;
  color: #f8f8f8;
}
</style>
