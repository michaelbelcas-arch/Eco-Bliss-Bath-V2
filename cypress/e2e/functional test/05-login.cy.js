import { faker } from "@faker-js/faker";

describe("Tests fonctionnels - Connexion", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("Connexion").click();
  });

  function remplirConnexion(email, password) {
    cy.get("input").eq(0).clear().type(email);
    cy.get("input").eq(1).clear().type(password);
    cy.get('[data-cy="login-submit"]').click();
  }

  it("Doit refuser un email invalide sans arobase", () => {
    remplirConnexion("emailinvalide.fr", "testtest");
    cy.url().should("include", "login");
  });

  it("Doit refuser un email très long avec caractères spéciaux", () => {
    const emailInvalide = `${faker.string.alphanumeric(50)}!#$%^&*test.fr`;
    remplirConnexion(emailInvalide, "testtest");
    cy.url().should("include", "login");
  });

  it("Doit refuser un mauvais mot de passe", () => {
    remplirConnexion("test2@test.fr", faker.internet.password());
    cy.url().should("include", "login");
  });

  it("Doit refuser un utilisateur inconnu", () => {
    remplirConnexion(faker.internet.email(), faker.internet.password());
    cy.url().should("include", "login");
  });

  it("Doit connecter puis déconnecter un utilisateur", () => {
    remplirConnexion("test2@test.fr", "testtest");

    cy.contains("Mon panier").should("be.visible");
    cy.contains("Déconnexion").should("be.visible");

    cy.contains("Déconnexion").click();

    cy.contains("Connexion").should("be.visible");
  });
});