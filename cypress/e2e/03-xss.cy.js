import { faker } from '@faker-js/faker';

describe("Test XSS Eco Bliss Bath", () => {

  let token;

  beforeEach(() => {
    // Nettoie le localStorage avant chaque test
    cy.clearLocalStorage();

    // Nettoie les cookies avant chaque test
    cy.clearCookies();

    // Connexion API pour récupérer le token JWT
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((response) => {
      // Sauvegarde le token
      token = response.body.token;

      // Ouvre le site avec le token dans le localStorage
      cy.visit("/", {
        onBeforeLoad(win) {
          win.localStorage.setItem("user", token);
        },
      });
    });
  });

  it("Doit empêcher une injection XSS dans les avis", () => {

  // Ouvre la page d'accueil
  cy.visit("/");

  // Clique sur le lien Avis
  cy.get('[data-cy="nav-link-reviews"]').click();

  // Clique sur la 5ème étoile
  cy.get('[data-cy="review-input-rating-images"] img')
    .eq(4)
    .click();

  // Remplit le champ Titre
  cy.get('[data-cy="review-input-title"]')
    .clear()
    .type("test");

  // Prépare le payload XSS
  const xssPayload = '<script>alert("XSS")</script>';

  // Surveille les alertes JavaScript
  cy.on("window:alert", () => {

  // Si une alerte apparaît, le test échoue
  throw new Error("Faille XSS détectée");

  });

  // Remplit le champ commentaire avec le payload XSS
  cy.get('[data-cy="review-input-comment"]')
    .clear()
    .type(xssPayload);

  // Clique sur Publier
  cy.get('[data-cy="review-submit"]')
    .click();

  // Vérifie que le script n'est pas affiché dans la page
  cy.get("body")
    .should("not.contain", "<script>");

});

 it("Doit empêcher une injection XSS dans les champs du panier", () => {

  // Ouvre la fiche produit "Dans la forêt"
  cy.visit("/#/products/6");

  // Vérifie que le produit est bien affiché
  cy.contains("Dans la forêt").should("be.visible");

  // Ajoute le produit au panier
  cy.get('[data-cy="detail-product-add"]').click();

  // Attend que la page panier soit chargée
  cy.url().should("include", "/cart");

  // Vérifie que le panier est affiché
  cy.contains("Commande").should("be.visible");

  // Prépare le payload XSS
  const xssPayload = '<script>alert("XSS")</script>';

  // Si une popup JS apparait => faille XSS
  cy.on("window:alert", () => {
    throw new Error("Faille XSS détectée");
  });

  // Remplit le champ Nom
  cy.get('input[formcontrolname="lastname"]')
    .clear()
    .type(xssPayload);

  // Remplit le champ Prénom
  cy.get('input[formcontrolname="firstname"]')
    .clear()
    .type(xssPayload);

  // Remplit le champ Adresse
  cy.get('input[formcontrolname="address"]')
    .clear()
    .type(xssPayload);

  // Remplit le champ Code postal
  cy.get('input[formcontrolname="zipCode"]')
    .clear()
    .type("75000");

  // Remplit le champ Ville
  cy.get('input[formcontrolname="city"]')
    .clear()
    .type(xssPayload);

  // Clique sur le bouton de validation
  cy.contains("Validez votre commande").click();

  // Vérifie qu'aucune popup XSS ne s'est déclenchée
  cy.get("body").should("be.visible");

});
});