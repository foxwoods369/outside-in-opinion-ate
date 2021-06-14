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
    create({commit}, newRestaurantName) {
      return api.createRestaurant(newRestaurantName).then(record => {
        commit('addRecord', record);
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
    addRecord(state, record) {
      state.records.push(record);
    },
  },
});

export default restaurants;
