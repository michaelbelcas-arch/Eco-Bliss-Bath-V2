describe("Tests fonctionnels Eco Bliss Bath", () => {

  function loginWithToken() {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((response) => {

      cy.visit("/", {
        onBeforeLoad(win) {
          win.localStorage.setItem("user", response.body.token);
        },
      });

    });
  }

  beforeEach(() => {
    loginWithToken();
  });

  it("Doit connecter un utilisateur", () => {

    cy.contains("Connexion")
      .should("not.exist");

  });

  it("Doit ajouter un produit au panier", () => {

    cy.contains("Produits").click();

    cy.contains("Consulter")
      .first()
      .click();

    cy.contains("Ajouter au panier")
      .click();

    cy.url()
      .should("not.include", "login");

  });

});