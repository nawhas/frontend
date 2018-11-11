import client from "../../services/client.js";

const state = {
  albums: null
};

const getters = {
  albums: state => {
    return state.albums;
  },
};

const mutations = {
  FETCH_ALBUMS(state, payload) {
    state.albums = payload.data;
  },
};

const actions = {
  fetchAlbums({commit}, payload) {
    client.get(`/api/reciters/${payload.reciter}/albums`)
      .then((response) => {
        commit('FETCH_ALBUMS', {
          data: response.data.data
        });
      });
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
