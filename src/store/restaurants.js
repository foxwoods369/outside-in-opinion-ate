const restaurants = (api, stateOverrides) => ({
  namespaced: true,
  state: {
    records: [],
    loadError: false,
    loading: false,
    ...stateOverrides,
  },
  actions: {
    load({commit}) {
      commit('startLoading');
      api
        .loadRestaurants()
        .then(records => {
          commit('storeRecords', records);
        })
        .catch(() => {
          commit('recordLoadingError');
        });
    },
  },
  mutations: {
    startLoading(state) {
      state.loading = true;
      state.loadError = false;
    },
    storeRecords(state, records) {
      state.records = records;
      state.loading = false;
    },
    recordLoadingError(state) {
      state.loading = false;
      state.loadError = true;
    },
  },
});

export default restaurants;
