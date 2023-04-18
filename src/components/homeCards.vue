<template>
    <div class="container flex-center" v-if="!showResourceLists && !showCreateResource">
      <div class="card-container" >
        <div
          class="card flex-center"
          @mouseover="highlightCard"
          @mouseout="unhighlightCard"
          @click="showResourceLists=true"
        >
          <h2>Resources</h2>
          <p>
            Here, you'll find a list of resources available to you. Browse through
            them to find what you need.
          </p>
        </div>
        <div
          class="card flex-center"
          @mouseover="highlightCard"
          @mouseout="unhighlightCard"
          @click="showCreateResource=true"
        >
          <h2>Create Resource</h2>
          <p>
            Here, you can create a new Resource that will be added to the list of
            existing Resources. Simply fill out the required fields and submit the
            form to create your new Resource.
          </p>
        </div>
      </div>
    </div>
      <ResourceList v-if="showResourceLists" @onEditResource="handleEditResource"/>
      <!-- <ResourceListUsingRedux v-if="showResourceLists"/> -->
      <CreateResource v-if="showCreateResource" :editData="editData"/>

  </template>
<script>

import ResourceList from './resourceList.vue'
import CreateResource from './createResource.vue'

export default {
  /* eslint-disable */
    name: 'HomeCards',
    components: {
        ResourceList,
        CreateResource
    },
    data() {
      return {
        showCreateResource: false,
        showResourceLists: false,
        editData: {}
      }
    },
    props: {},
    methods: {
      highlightCard(event) {
        event.target.classList.add('highlight')
      },
      unhighlightCard(event) {
        event.target.classList.remove('highlight')
      },
      handleEditResource(resource) {
        this.showCreateResource = true;
        this.showResourceLists=false;
        this.editData =resource;
      }
    },
  }
  </script>
  
  <style>
  .container {
    padding: 5px 0;
    height: calc(100% - 100px);
  }
  
  .card-container {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 20px;
    cursor: pointer;
  }
  
  .card {
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  .flex-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .highlight {
    box-shadow: 0px 0px 5px #007bff;
  }
  
  .router-link a {
    text-decoration: none;
    color: inherit;
  }
  </style>