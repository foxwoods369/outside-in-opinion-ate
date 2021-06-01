import {apiKey} from '../../../apikey';

describe('Listing Restaurants', () => {
  describe('when loading succeeds', () => {
    it('shows restaurants from the server', () => {
      const sushiPlace = 'Sushi Place';
      const pizzaPlace = 'Pizza Place';

      cy.server({force404: true});

      cy.route({
        method: 'GET',
        url: `https://outside-in-dev-api.herokuapp.com/${apiKey}/restaurants`,
        response: [
          {id: 1, name: sushiPlace},
          {id: 2, name: pizzaPlace},
        ],
      });

      cy.visit('/');
      cy.contains(sushiPlace);
      cy.contains(pizzaPlace);
      cy.get('[data-testid="loading-error"]').should('not.exist');
    });
  });

  describe('when loading fails', () => {
    it('shows the error message', () => {
      cy.server({force404: true});

      cy.visit('/');
      cy.get('[data-testid="loading-error"]').should('exist');
    });
  });
});
