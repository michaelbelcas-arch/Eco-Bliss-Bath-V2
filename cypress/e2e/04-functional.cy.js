import { faker } from "@faker-js/faker";

describe("Tests fonctionnels Eco Bliss Bath", () => {
  let token;
  let productId;

  beforeEach(() => {
    // Connexion API
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((response) => {
      token = response.body.token;

      // Récupère la liste des produits
      cy.request("GET", "http://localhost:8081/products").then((response) => {
        // Choisit un produit avec du stock
        const product = response.body.find((item) => item.availableStock > 0);

        productId = product.id;

        // Ouvre le site en étant connecté
        cy.visit("/", {
          onBeforeLoad(win) {
            win.localStorage.setItem("user", token);
          },
        });
      });
    });
  });

  it("Doit connecter un utilisateur", () => {
    // Vérifie que l'utilisateur est connecté
    cy.contains("Mon panier").should("be.visible");
    cy.contains("Déconnexion").should("be.visible");
  });

  it("Doit ajouter puis supprimer un produit de mon panier", () => {

    // Ouvre la page produits
    cy.contains("Produits").click();

    // Cible précisément le produit Chuchotements d'été
    cy.contains('[data-cy="product-name"]', "Chuchotements d'été")
      .parents('[data-cy="product"]')
      .within(() => {

    // Clique sur le bouton consulter du bon produit
    cy.get('[data-cy="product-link"]').click();

    });

    // Vérifie qu'on est sur la fiche produit
    cy.url().should("include", "/products/4");

    // Ajoute le produit au panier
    cy.get('[data-cy="detail-product-add"]').click();

    // Ouvre le panier
    cy.get('[data-cy="nav-link-cart"]').click();

    // Vérifie la présence du produit
    cy.get('[data-cy="cart-line"]').should("be.visible");

    // Supprime le produit
    cy.get('[data-cy="cart-line-delete"]').click();

    // Vérifie la suppression
    cy.contains("Chuchotements d'été").should("not.exist");

});

  it("Ne doit pas permettre d'ajouter une quantité négative au panier", () => {
    // Ouvre directement un produit disponible
    cy.visit(`/#/products/${productId}`);

    // Saisit une quantité négative
    cy.get("input").clear().type("-1");

    // Tente d'ajouter au panier
    cy.contains("Ajouter au panier").click();

    // Vérifie qu'on n'est pas redirigé vers le panier
    cy.url().should("not.include", "cart");
  });

  it("Doit ajouter un avis utilisateur", () => {
    // Ajoute un avis via l'API
    cy.request({
      method: "POST",
      url: "http://localhost:8081/reviews",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        title: faker.lorem.words(3),
        comment: faker.lorem.sentences(2),
        rating: 5,
      },
    }).then((response) => {
      expect([200, 201]).to.include(response.status);
    });
  });
});