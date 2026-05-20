describe("Smoke tests Eco Bliss Bath", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  it("Doit afficher le bouton de connexion", () => {
    cy.contains("Connexion").should("be.visible");
  });

  it("Doit afficher la section des produits", () => {
    cy.contains("Voir les produits").should("be.visible");
    cy.contains("Voir les produits").click();
    cy.contains("Consulter").should("be.visible");
  });

  it("Doit afficher les boutons consulter", () => {
    cy.contains("Voir les produits").click();
    cy.contains("Consulter").should("be.visible");
  });

});