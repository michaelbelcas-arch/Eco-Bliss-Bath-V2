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
      expect(response.status).to.eq(200);
      expect(response.body.token).to.exist;

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

  it("Doit connecter un utilisateur avec un token JWT valide", () => {
    cy.contains("Connexion").should("not.exist");
    cy.contains("Déconnexion").should("be.visible");
    cy.contains("Mon panier").should("be.visible");
  });

  it("Doit ajouter un produit au panier", () => {
    cy.contains("Produits").click();

    cy.contains("Consulter").first().click();

    cy.contains("Ajouter au panier").click();

    cy.url().should("not.include", "login");

    cy.contains("Mon panier").should("be.visible");
  });
});