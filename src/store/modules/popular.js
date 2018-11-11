import client from "../../services/client.js";

const state = {
  popularReciters: null,
  popularAlbums: null,
  popularTracks: null
};

const getters = {
  popularReciters: state => {
    return state.popularReciters;
  },
  popularAlbums: state => {
    return state.popularAlbums;
  },
  popularTracks: state => {
    return state.popularTracks;
  },
};

const mutations = {
  FETCH_POPULAR_RECITERS(state, payload) {
    state.popularReciters = payload.data;
  },
  FETCH_POPULAR_ALBUMS(state, payload) {
    state.popularAlbums = payload.data;
  },
  FETCH_POPULAR_TRACKS(state, payload) {
    state.popularTracks = payload.data;
  },
};

const actions = {
  fetchPopularReciters({commit}) {
    client.get('/v1/popular/reciters')
      .then((response) => {
        commit('FETCH_POPULAR_RECITERS', {
          data: response.data.data
        });
      });
  },
  fetchPopularAlbums({commit}) {
    client.get('/v1/popular/albums')
      .then((response) => {
        commit('FETCH_POPULAR_ALBUMS', {
          data: response.data.data
        });
      });
  },
  fetchPopularTracks({commit}, options = {}) {
    client.get('/v1/popular/tracks', options)
      .then((response) => {
        commit('FETCH_POPULAR_TRACKS', {
          data: response.data.data
        });
      });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
  namespaced: true
};
