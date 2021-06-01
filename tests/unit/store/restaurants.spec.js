import Vuex from 'vuex';
import {createLocalVue} from '@vue/test-utils';
import restaurants from '@/store/restaurants';

describe('restaurants', () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  describe('initially', () => {
    it('does not have the loading flag set', () => {
      const store = new Vuex.Store({
        modules: {
          restaurants: restaurants(),
        },
      });

      expect(store.state.restaurants.loading).toBe(false);
    });
  });
  describe('load action', () => {
    describe('while loading', () => {
      it('sets a loading flag', () => {
        const api = {
          loadRestaurants: () => new Promise(() => {}),
        };

        const store = new Vuex.Store({
          modules: {
            restaurants: restaurants(api),
          },
        });

        store.dispatch('restaurants/load');
        expect(store.state.restaurants.loading).toBe(true);
      });
    });
    describe('when loading succeeds', () => {
      const records = [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizz Place'},
      ];

      let store;

      beforeEach(() => {
        const api = {
          loadRestaurants: () => Promise.resolve(records),
        };

        store = new Vuex.Store({
          modules: {
            restaurants: restaurants(api),
          },
        });

        return store.dispatch('restaurants/load');
      });

      it('clears the loading flag', () => {
        expect(store.state.restaurants.loading).toBe(false);
      });

      it('stores the restaurants', async () => {
        expect(store.state.restaurants.records).toEqual(records);
      });
    });
  });
});
