import { faker } from '@faker-js/faker';

describe("Test XSS Eco Bliss Bath", () => {

  let token;

  before(() => {

    // Connexion API pour récupérer un token JWT
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((response) => {

      // Sauvegarde du token utilisateur
      token = response.body.token;

    });

  });

  it("Doit empêcher une injection XSS dans les avis", () => {

    // Génération d'un faux commentaire contenant une tentative XSS
    const fakeComment =
      `<script>alert("XSS")</script> ${faker.lorem.sentence()}`;

    // Envoi de la requête d'ajout d'avis
    cy.request({
      method: "POST",
      url: "http://localhost:8081/reviews",
      headers: {

        // Authentification avec JWT
        Authorization: `Bearer ${token}`,

      },

      // Empêche Cypress de bloquer automatiquement
      // si le backend retourne une erreur
      failOnStatusCode: false,

      body: {

        // Génération d'un faux titre produit
        title: faker.commerce.productName(),

        // Injection du commentaire XSS
        comment: fakeComment,

        // Note du produit
        rating: 5,

      },

    }).then((response) => {

      // Vérifie que la requête répond correctement
      expect([200, 201, 400]).to.include(response.status);

      // Vérifie qu'aucune balise script
      // n'est renvoyée par l'API
      expect(response.body.comment || "")
        .to.not.include("<script>");

    });

  });

});