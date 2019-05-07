/// <reference types="Cypress" />

import Chance from 'chance';
const chance = new Chance();
describe('FireStarter' , () => {

  const email = chance.email();
  const pass = 'ValidPassword';

  beforeEach(() => {
    cy.visit('http://localhost:4200');
  })

  it('Shows a recipe list xd', () => {
    cy.get('#navbar').click();
    cy.contains('recipes');
    cy.get('/recipes');
  });

});
