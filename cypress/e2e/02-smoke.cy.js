describe("Smoke tests Eco Bliss Bath", () => {

  beforeEach(() => {

    cy.visit("/");

  });

  it("Doit afficher le bouton de connexion", () => {

    cy.contains("Connexion").should("be.visible");

  });

  it("Doit afficher les produits sur la page d'accueil", () => {

    cy.contains("Voir les produits")
    .should("be.visible");

 });

  it("Doit afficher les boutons consulter", () => {

    cy.contains("Consulter")
      .should("exist");

  });

});