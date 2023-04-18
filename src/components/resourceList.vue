<template>
  <Loader v-if="showLoading" />
  <div class="container">
    <h1>Resources</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>User ID</th>
          <th>Title</th>
          <th>Description</th>
          <th colspan="2"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="resource in resources" :key="resource.id">
          <td>{{ resource.id }}</td>
          <td>{{ resource.userId }}</td>
          <td>{{ resource.title }}</td>
          <td>{{ resource.body }}</td>
          <td>
            <a
              @click="
                editResource(
                  resource.id,
                  resource.userId,
                  resource.title,
                  resource.body
                )
              "
              class="link"
              >Edit
            </a>
          </td>
          <td>
            <a @click="deleteResource(resource.id)" class="link">Delete </a>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <Paginate
        :page-count="pageCount"
        :click-handler="paginate"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :page-link-class="'page-link'"
        :prev-class="'page-item'"
        :prev-link-class="'page-link'"
        :next-class="'page-item'"
        :next-link-class="'page-link'"
        :disabled-class="'disabled'"
        :active-class="'active'"
      >
        <ul class="pagination justify-content-center">
          <li
            v-for="page in pageCount"
            :key="page"
            :class="['page-item', { active: page === currentPage }]"
          >
            <a class="page-link" @click="paginate(page)">{{ page }}</a>
          </li>
        </ul>
      </Paginate>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import Paginate from "vuejs-paginate";
import Loader from "./loader.vue";

export default {
  name: "ResourceList",
  components: {
    Loader,
  },
  data() {
    return {
      resources: [],
      currentPage: 1,
      itemsPerPage: 5,
      totalResources: 0,
      showLoading: true,
      pageCount: 0,
    };
  },

  computed: {
    pageCount() {
      return Math.ceil(this.totalResources / this.itemsPerPage);
    },
  },
  methods: {
    async loadResources(pageNumber) {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=${this.itemsPerPage}`
        );
        const data = await response.json();
        this.resources = data;
        this.currentPage = pageNumber;
        this.totalResources =
          parseInt(response.headers.get("x-total-count")) || 0;
      } catch (error) {
        console.error(error);
      } finally {
        this.showLoading = false;
      }
    },
    paginate(pageNumber) {
      this.loadResources(pageNumber);
    },
    editResource(id, userId, title, body) {
      const resource = {
        id: id,
        userId: userId,
        title: title,
        body: body,
      };
      this.$emit("onEditResource", resource);
    },
    deleteResource(id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete resource");
          }
          return response.json();
        })
        .then((data) => {
          this.resources = this.resources.filter((el) => el.id != id);
          console.log(this.resources);
          window.alert("Resource deleted successfully!");
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    // Load the first page of resources
    this.loadResources(1);
  },
};
</script>

<style scoped>
.pagination {
  height: 100px;
  width: 100%;
}
.resource-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.resource {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.link {
  color: blue;
  text-decoration: none;
  cursor: pointer;
}

.link:hover {
  text-decoration: underline;
}

.load-more:hover {
  opacity: 0.8;
}

.container {
  margin: 0 10px;
  overflow-y: auto;
  position: relative;
  overflow-x: hidden;
}

.container h1 {
  float: left;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th {
  text-align: left;
  background-color: #ccc;
  padding: 10px;
}

td {
  padding: 10px;
  border: 1px solid #ccc;
}
.page-item {
  display: inline-block;
  margin-right: 5px;
}

.page-link {
  display: block;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  color: #333;
}

.active .page-link {
  background-color: #007bff;
  color: #fff;
}

.disabled .page-link {
  opacity: 0.5;
  cursor: not-allowed;
}
li {
  cursor: pointer;
}
</style>
