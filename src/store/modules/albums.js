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
  async fetchAlbums({commit}, payload) {
    const response = await client.get(`/v1/reciters/${payload.reciter}/albums`);
    commit('FETCH_ALBUMS', {
      data: response.data.data
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
