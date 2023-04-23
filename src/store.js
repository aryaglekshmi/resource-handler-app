/* eslint-disable */

import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    resources: [],
    currentPage: 1,
    totalResourcesLength: 0,
    showLoading: false,
    itemsPerPage: 5,
    allResources: [],
    resourceFormData: {
      userId: null,
      title: "",
      body: "",
      id: null
    },
  },
  getters: {
    pageCount: (state) => {
      return Math.ceil(state.totalResourcesLength / state.itemsPerPage);
    },
  },
  mutations: {
    SET_RESOURCES(state, resources) {
      state.allResources = resources;
      state.totalResourcesLength = resources.length;
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_RESOURCES_TO_DISPLAY(state, resources) {
      state.resources = resources;
    },
    resources(state, total) {
      state.totalResourcesLength = total;
    },
    SET_LOADING(state, value) {
      state.showLoading = value;
    },
    DELETE_RESOURCE(state, id) {
      state.allResources = state.allResources.filter((el) => el.id != id);
      state.totalResourcesLength = state.allResources.length;
    },
    SET_RESOURCES_FORM_DATA(state, resourceFormData) {
      state.resourceFormData = resourceFormData;
    },
  },
  actions: {
    async fetchAllResources({ state, dispatch, commit }) {
      if (!state.totalResourcesLength > 0) {
        try {
          commit("SET_LOADING", true);
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts`
          );
          commit("SET_RESOURCES", response.data);
          commit("SET_TOTAL_RESOURCES_LENGTH", response.data.length);
        } catch (error) {
          console.error(error);
        } finally {
          commit("SET_LOADING", false);
        }
      }
      dispatch("paginateResources", 1);
    },

    paginateResources({ commit, state }, pageNumber) {
      commit("SET_CURRENT_PAGE", pageNumber);
      const startIndex = (state.currentPage - 1) * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      if (state?.allResources?.length) {
        commit(
          "SET_RESOURCES_TO_DISPLAY",
          state.allResources.slice(startIndex, endIndex)
        );
      }
    },

    async deleteResource({ commit, dispatch, state }, id) {
      commit("SET_LOADING", true);
      try {
        const response = await axios.delete(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        if (response.status !== 200) {
          throw new Error("Failed to delete resource");
        }
        commit("DELETE_RESOURCE", id);
        window.alert("Resource deleted successfully!");
        dispatch("paginateResources", state.currentPage);
      } catch (error) {
        console.error(error);
      } finally {
        commit("SET_LOADING", false);
      }
    },

    async submitFormData({ state, commit, dispatch }, editMode) {
      commit("SET_LOADING", true);
      if (!state.allResources.length) {
        await dispatch("fetchAllResources");
      }
      try {
        let response;
        if (editMode) {
          response = await axios.put(
            `https://jsonplaceholder.typicode.com/posts/${state.resourceFormData.id}`,
            state.resourceFormData
          );
        } else {
          response = await axios.post(
            "https://jsonplaceholder.typicode.com/posts",
            state.resourceFormData
          );
        }
        if (response.status === 201 || response.status === 200) {
          const resource = response.data;
          const index = state.allResources.findIndex(
            (el) => el.id === resource.id
          );
          let ModifiedAllResources = state.allResources;
          if (index >= 0) {
            state.allResources.splice(index, 1, resource);
          } else {
            state.allResources.push(resource);
          }
          ModifiedAllResources = state.allResources;
          commit("SET_RESOURCES", ModifiedAllResources);
          commit("SET_RESOURCES_FORM_DATA", {
            userId: null,
            title: "",
            body: "",
          });
          return true;
        }
      } catch (error) {
        console.error(error);
        window.alert("Failed to save resource");
        return false;
      } finally {
        commit("SET_LOADING", false);
      }
    },
    setResourceFormData({ state, commit }, editData) {
      commit("SET_RESOURCES_FORM_DATA", editData);
    },
  },
});

export default store;
