import { faker } from "@faker-js/faker";

describe("Tests API Eco Bliss Bath", () => {
  let token;

  before(() => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.token).to.exist;

      token = response.body.token;
    });
  });

  it("Doit refuser l'accès au panier si l'utilisateur n'est pas connecté", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("Doit connecter un utilisateur et récupérer un token JWT", () => {
    expect(token).to.exist;
  });

  it("Doit récupérer les produits du panier avec un token valide", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Doit récupérer une fiche produit", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8081/products/3",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("name");
      expect(response.body).to.have.property("price");
    });
  });

  it("Doit ajouter un produit disponible au panier", () => {
    cy.request({
      method: "PUT",
      url: "http://localhost:8081/orders/add",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        product: 3,
        quantity: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("Doit ajouter un avis produit", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/reviews",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        title: "Avis test automatisé",
        comment: "Produit testé avec Cypress",
        rating: 5,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([200, 201]);
    });
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
  

  it("Ne doit pas ajouter un produit en rupture de stock au panier", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/orders/add",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        product: 3,
        quantity: 999,
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.not.eq(200);
    });


  });
});
it("Doit retourner une erreur 403 lors d'une demande d'accès à des données confidentielles sans autorisation", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(403);
    });
  });