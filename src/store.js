import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    resources: [],
  },
  getters: {
    resources(state) {
      return state.resources;
    },
    totalResources(state) {
      return state.resources.totalResources;
    },
  },
  mutations: {
    addResource(state, resource) {
      state.resources.push(resource);
    },
    updateResource(state, updatedResource) {
      const index = state.resources.findIndex(
        (resource) => resource.id === updatedResource.id
      );
      if (index !== -1) {
        Vue.set(state.resources, index, updatedResource);
      }
    },
    deleteResource(state, resourceId) {
      state.resources = state.resources.filter(
        (resource) => resource.id !== resourceId
      );
    },
    setResources(state, resources) {
      state.resources = resources;
    },
  },
  actions: {
    async createResource({ commit }, resourceData) {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resourceData),
        }
      );
      if (response.ok) {
        const newResource = await response.json();
        commit("addResource", newResource);
        return newResource;
      } else {
        throw new Error("Failed to create resource");
      }
    },
    async updateResource({ commit }, { resourceId, resourceData }) {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${resourceId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resourceData),
        }
      );
      if (response.ok) {
        const updatedResource = await response.json();
        commit("updateResource", updatedResource);
        return updatedResource;
      } else {
        throw new Error("Failed to update resource");
      }
    },
    async deleteResource({ commit }, resourceId) {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${resourceId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        commit("deleteResource", resourceId);
      } else {
        throw new Error("Failed to delete resource");
      }
    },
    async fetchResources({ commit }, { page = 1, pageSize = 5 } = {}) {
      const start = (page - 1) * pageSize;
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${pageSize}`
      );
      if (response.ok) {
        const resources = await response.json();
        const total = response.headers.get("x-total-count");
        commit("setResources", { resources, total });
        return { resources, total };
      } else {
        throw new Error("Failed to fetch resources");
      }
    },
  },
});

export default store;
