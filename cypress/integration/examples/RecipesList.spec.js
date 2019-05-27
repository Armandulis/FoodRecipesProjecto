/// <reference types="Cypress" />

import Chance from 'chance';
const chance = new Chance();
describe('FireStarter' , () => {

  const email = chance.email();
  const pass = 'ValidPassword';

  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('Should contain nav', () => {
    cy.contains('nav');
  });

});
