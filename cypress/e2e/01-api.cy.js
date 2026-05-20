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

      token = response.body.token;

    });

  });

  it("Doit retourner une erreur 401 si utilisateur non connecté", () => {

    cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      failOnStatusCode: false,
    }).then((response) => {

      expect(response.status).to.eq(401);

    });

  });

  it("Doit connecter un utilisateur", () => {

    expect(token).to.exist;

  });

  it("Doit récupérer les produits du panier", () => {

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

    });

  });

  it("Doit ajouter un produit au panier", () => {

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

  it("Doit ajouter un avis", () => {

    cy.request({
      method: "POST",
      url: "http://localhost:8081/reviews",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: {
        title: "Super produit",
        comment: "Très bon savon",
        rating: 5,
      },
      failOnStatusCode: false,
    }).then((response) => {

      expect(response.status).to.be.oneOf([200, 201]);

    });

  });

});