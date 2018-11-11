import client from "../../services/client.js";

const state = {
  tracks: null,
  track: null
};

const getters = {
  tracks: state => {
    return state.tracks;
  },
  track: state => {
    return state.track;
  },
};

const mutations = {
  FETCH_TRACKS(state, payload) {
    state.tracks = payload.data;
  },
  FETCH_TRACK(state, payload) {
    state.track = payload.data;
  },
  STORE_TRACK(state, payload) {
    state.tracks.push(payload.data);
  },
  UPDATE_TRACK(state, payload) {
    state.track = payload.data;
  }
};

const actions = {
  fetchTracks({commit}, payload) {
    client.get(`/v1/reciters/${payload.reciter}/albums/${payload.album}/tracks`)
      .then((response) => {
        commit('FETCH_TRACKS', {
          data: response.data.data
        });
      });
  },
  fetchTrack({commit}, payload) {
    client.get(`/v1/reciters/${payload.reciter}/albums/${payload.album}/tracks/${payload.track}`)
      .then((response) => {
        commit('FETCH_TRACK', {
          data: response.data.data
        });
      });
  },
  storeTrack({commit}, payload) {
    client.post(`/v1/reciters/${payload.reciter}/albums/${payload.album}/tracks`, payload.form)
      .then((response) => {
        commit('STORE_TRACK', {
          data: response.data.data
        });
      });
  },
  updateTrack({commit}, payload) {
    client.post(`/v1/reciters/${payload.reciter}/albums/${payload.album}/tracks/${payload.track}`, payload.form)
      .then((response) => {
        commit('UPDATE_TRACK', {
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
