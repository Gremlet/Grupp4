// jshint esversion:6

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    allProducts: null,
    cart: [],
    search: null,
    filteredSearch: null,

    //User details
    users: [
      {
        id: 1,
        username: "testuser",
        password: "test",
        email: "test@test.com",
        favourites: [],
        orders: []
      },
      {
        id: 2,
        username: "testuser2",
        password: "test2",
        email: "test@test.com",
        favourites: [],
        orders: []
      }
    ]
  },
  getters: {
    getSearch(state) {
      return state.search;
    },
    getFilteredSearch(state) {
      return state.filteredSearch;
    }
  },
  mutations: {
    setAllProducts(state, products) {
      state.allProducts = products;
    },
    pushToCart(state, newInfo) {
      state.cart.push(newInfo);
    },
    removeItem(state, id) {
      Vue.delete(state.cart, id);
    },
    // User mutations
    addUser(state, user) {
      state.users.push(user);
    },
    editUsername(state, newName) {
      const index = state.users.findIndex(users => users.id === newName.id);
      state.users[index].username = newName.username;
    },
    editPassword(state, newPassword) {
      const index = state.users.findIndex(users => users.id === newPassword.id);
      state.users[index].password = newPassword.password;
    },
    editEmail(state, newEmail) {
      const index = state.users.findIndex(users => users.id === newEmail.id);
      state.users[index].email = newEmail.email;
    },
    // favourites
    addToFavourites(state, product) {
      const index = state.users.findIndex(
        users => users.username === product.username
      );
      state.users[index].favourites.push(product.product);
    },

    // orders
    addOrder(state, payload) {
      const index = state.users.findIndex(users => users.id === payload.id);
      state.users[index].orders.push({
        id: Math.floor(Math.random() * 100),
        order: payload.order,
        price: payload.price
      });
    },

    // empty cart on checkout

    emptyCart(state, payload) {
      state.cart = payload;
    },
    setSearch(state, newSearch) {
      state.search = newSearch;
    },
    filteredProducts(state, searchWord) {
      if (state.allProducts === null) {
        return [];
      } else {
        state.search = searchWord;
        searchWord = searchWord.trim().toLowerCase();
        state.filteredSearch = state.allProducts.filter(product => {
          return (
            product.productType.toLowerCase().includes(searchWord) ||
            product.productTarget.toLowerCase().includes(searchWord)
          );
        });
      }
    }
  },
  actions: {
    async getProductInfo(context) {
      const productInfo = await fetch(
        "https://ourstoreapi.netlify.app/products.json"
      );
      const productResult = await productInfo.json();
      context.commit("setAllProducts", productResult.products);
    },
    SET_SEARCH(context, newSearch) {
      context.commit("setSearch", newSearch);
    },
    filteredProducts({ commit }, searchWord) {
      commit("filteredProducts", searchWord);
    }
  }
});
