<template>
  <div class="loading-container flex-center">
    <div class="loading-spinner"></div>
  </div>
</template>
<script>
export default {
  /* eslint-disable */
  name: "Loader",
};
</script>
<style>
.loading-spinner {
  border: 6px solid rgba(0, 0, 0, 0.1);
  border-top-color: #333;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s ease-in-out infinite;
}
.loading-container {
  position: absolute;
  height: 100%;
  width: 100%;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
