<template>
  <footer>
      <div class="flex-center">
          <p>2023 Resource Handler App   |    Contact</p>
      </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  props: {}
}
</script>
<style scoped>
footer {
  background-color: #222;
  color: #fff;
  height: 50px;
}
footer .flex-center {
    height: 100%;
    flex-direction: row;
    justify-content: flex-end;
}

footer p {
  font-size: 14px;
  margin: 0;
  padding-right: 10px;}

footer a {
  color: #fff;
  text-decoration: none;
}
</style>
