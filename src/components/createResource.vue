<template>
  <Loader v-if="showLoading"/>
  <div class="container">
    <h1>{{ editData?.id ? "Edit Resource" : "Create Resource" }}</h1>
    <form @submit.prevent="submitForm">
      <div>
        <label for="userId">User ID:</label>
        <input
          type="number"
          id="userId"
          v-model="resourceFormData.userId"
          required
        />
      </div>
      <div>
        <label for="title">Title:</label>
        <input
          type="text"
          id="title"
          v-model="resourceFormData.title"
          required
        />
      </div>
      <div>
        <label for="body">Description:</label>
        <textarea id="body" v-model="resourceFormData.body" required></textarea>
        <button v-if="editData?.id" type="submit">Update Resource</button>
        <button v-if="!editData.id" type="submit">Create Resource</button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import Loader from "./loader.vue";

export default {
  props: ["editData"],
  components: {
    Loader,
  },
  computed: {
    ...mapState(["resourceFormData", "setResourceFormData", "showLoading"]),
  },
  data() {},
  methods: {
    async submitForm() {
      const isUpdate = this.editData?.id ? true : false;
      const isSaved = await this.$store.dispatch(
        "submitFormData",
        isUpdate
      );
      if (isSaved) {
        this.$emit("onSuccess");
      }
    },
  },
  mounted() {
    if (this.editData) {
      this.$store.dispatch("setResourceFormData", this.editData);
    }
  },
};
</script>
<style scoped>
h1 {
  text-align: left;
}
form {
  width: 50%;
  text-align: left;
}
input,
textarea {
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
</style>
