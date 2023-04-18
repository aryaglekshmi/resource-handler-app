<template>
    <div>
      <ul>
        <li v-for="resource in resources" v-bind:key="resource.id" v-bind:resource="resource">
          {{ resource.title }}
        </li>
      </ul>
      <div>
        <button @click="prevPage" :disabled="page === 1">Prev</button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="page === totalPages">Next</button>
        <select v-model="pageSize" @change="fetchResources">
          <option v-for="size in pageSizes" v-bind:key="size" :value="size">{{ size }} per page</option>
        </select>
      </div>
    </div>
  </template>

<script>
/* eslint-disable */
  import { mapGetters, mapActions } from 'vuex';
  
  export default {
    name: "ResourceListUsingRedux",
    computed: {
      ...mapGetters(['resources', 'totalResources']),
      totalPages() {
        return Math.ceil(this.totalResources / this.pageSize);
      },
      pageSizes() {
        return [5];
      },
    },
    data() {
      return {
        page: 1,
        pageSize: 5,
      };
    },
    mounted() {
      this.fetchResources();
    },
    methods: {
      ...mapActions(['fetchResources']),
      prevPage() {
        if (this.page > 1) {
          this.page--;
          this.fetchResources();
        }
      },
      nextPage() {
        if (this.page < this.totalPages) {
          this.page++;
          this.fetchResources();
        }
      },
      fetchResources() {
        this.fetchResources({ page: this.page, pageSize: this.pageSize });
      },
    },
  };
  </script>
  