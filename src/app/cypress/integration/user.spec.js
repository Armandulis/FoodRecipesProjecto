
describe("Knowledge Base Application", () => {
  beforeEach(() => {
    cy.fixture("users/admin").as("admin");
  });
  // previous test omitted for brevity
  it("Should be able to login: admin", function() {
    cy.visit("/login");

    cy
      .get('input[name="password"]')
      .type(this.admin.password)
      .should("have.value", this.admin.password);
    cy.get("form").submit();
    cy.location("pathname").should("eq", "/home");
  });
});

