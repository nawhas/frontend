import client from "../../services/client.js";
import store from "../../store";

const state = {
  reciters: null,
  reciter: null
};

const getters = {
  reciters: state => {
    return state.reciters;
  },
  reciter: state => {
    return state.reciter;
  },
};

const mutations = {
  FETCH_RECITERS(state, payload) {
    state.reciters = payload.data;
  },
  FETCH_RECITER(state, payload) {
    state.reciter = payload.data;
    store.dispatch('popular/fetchPopularTracks', {limit: 6, reciterId: state.reciter.id });
  },
  STORE_RECITER(state, payload) {
    state.reciter.push(payload.data);
  },
};

const actions = {
  fetchReciters({commit}) {
    client.get('/v1/reciters')
      .then((response) => {
        commit('FETCH_RECITERS', {
          data: response.data.data
        });
      });
  },
  fetchReciter({commit}, payload) {
    client.get(`/v1/reciters/${payload.reciter}`)
      .then((response) => {
        commit('FETCH_RECITER', {
          data: response.data
        });
      });
  },
  storeReciter({commit}, payload) {
    client.post('/v1/reciters', payload.form)
      .then((response) => {
        commit('STORE_RECITER', {
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
