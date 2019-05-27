/// <reference types="Cypress" />

describe('Button name check', function() {
  it('Checks if the button is named Details', function () {
    cy.visit('http://localhost:4200/recipes/');
    cy.contains("Details")
  });
});

it('Recipe image is visible', function() {
  cy.visit('http://localhost:4200/recipes/');
  cy.get(".photo-main").should('be.visible');
});

it('has a visible navigation menu', function() {
  cy.visit('http://localhost:4200');
  cy.get('.navbar').should('be.visible');
});

describe('Sign up window opens', function() {
  it('Check if sign up pressed button opens a new window ', function () {
    cy.visit('http://localhost:4200');
    cy.get("button.nav-item:nth-child(3)").click();
    cy.get(".modal-content")
  });
});

describe('Pressing update on recipe open update recipe window', function() {
  it('Check if update button open update window ', function () {
    cy.visit('http://localhost:4200/recipes/0vGC4nY7f3lsNEo35jX7');
    cy.get("button.btn:nth-child(1)").click();
    cy.url("http://localhost:4200/recipes/update/0vGC4nY7f3lsNEo35jX7")
  });
});



describe('Home button takes to main page', function() {
  it('pressing Home takes to main page', function () {
    cy.visit('http://localhost:4200/recipes/');
    cy.get(".navbar-brand").click();
    cy.url("http://localhost:4200")
  });
});

describe('Routed recipe contains specified name', function() {
  it('A title contains a name', function () {
    cy.visit('http://localhost:4200/recipes/');
    cy.get(".buy--btn").click({multiple: true, force: true});
    cy.get(".card-title").contains("Burger")
  });
});

describe('Button existence check', function() {
  it('does Details button exist on recipes page ', function () {
    cy.visit('http://localhost:4200/recipes/');
    cy.get(".buy--btn")
  });
});

describe('Recipe exist on /recipes', function() {
  it('Does recipe exist on /recipes page ', function () {
    cy.visit('http://localhost:4200/recipes/');
    cy.get(".product").contains("Recipe")
  });
});

describe('Details button routing to recipe', function() {
  it('Details button routes to recipe', function () {
    cy.visit('http://localhost:4200/recipes/');
    cy.get(".buy--btn").click({multiple: true, force: true});
  });
});
