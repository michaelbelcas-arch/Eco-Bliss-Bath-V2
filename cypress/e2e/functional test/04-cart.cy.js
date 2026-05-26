describe("Tests fonctionnels Eco Bliss Bath - Panier", () => {
  let token;

  beforeEach(() => {
    // Nettoie le localStorage avant chaque test
    cy.clearLocalStorage();

    // Nettoie les cookies avant chaque test
    cy.clearCookies();

    // Connexion API pour récupérer un token JWT
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: "test2@test.fr",
        password: "testtest",
      },
    }).then((response) => {
      // Sauvegarde le token utilisateur
      token = response.body.token;

      // Ouvre le site en injectant le token avant le chargement
      cy.visit("/", {
        onBeforeLoad(win) {
          win.localStorage.setItem("user", token);
        },
      });
    });
  });

  
  afterEach(() => {
    // Ouvre le panier après chaque test
    cy.visit("/#/cart");

    // Supprime le premier produit présent dans le panier s'il existe
    cy.get("body").then(($body) => {
      if ($body.find('[data-cy="cart-line-delete"]').length > 0) {
        cy.get('[data-cy="cart-line-delete"]').first().click();
      }
    });

    // Nettoie le localStorage
    cy.clearLocalStorage();

    // Nettoie les cookies
    cy.clearCookies();
  });


  it("Ajoute un produit au panier", () => {
    // Ouvre la fiche produit Dans la forêt
    cy.visit("/#/products/6");

    // Vérifie que le produit est affiché
    cy.contains("Dans la forêt").should("be.visible");

    // Clique sur Ajouter au panier
    cy.get('[data-cy="detail-product-add"]').click();

    // Attend la redirection automatique vers le panier
    cy.url().should("include", "/cart");

    // Vérifie que le produit est présent dans le panier
    cy.contains("Dans la forêt").should("be.visible");
  });


  it("Ajoute un produit au panier avec une quantité supérieure au stock disponible", () => {
    // Récupère les informations du produit depuis l'API
    cy.request("GET", "http://localhost:8081/products/6").then((response) => {
      // Récupère le stock disponible actuel
      const stockDisponible = response.body.availableStock;

      // Calcule une quantité supérieure au stock
      const quantiteSuperieureAuStock = stockDisponible + 1;

      // Ouvre la fiche produit Dans la forêt
      cy.visit("/#/products/6");

      // Vérifie que le produit est affiché
      cy.contains("Dans la forêt").should("be.visible");

      // Saisit une quantité supérieure au stock disponible
      cy.get('[data-cy="detail-product-quantity"]')
        .clear()
        .type(quantiteSuperieureAuStock.toString());

      // Clique sur Ajouter au panier
      cy.get('[data-cy="detail-product-add"]').click();

      // Attend la redirection automatique vers le panier
      cy.url().should("include", "/cart");

      // Vérifie que le produit est présent dans le panier
      cy.contains("Dans la forêt").should("be.visible");
    });
  });


  it("Ajoute un produit au panier avec une quantité égale à zéro", () => {
    // Ouvre la fiche produit Dans la forêt
    cy.visit("/#/products/6");

    // Vérifie que le produit est affiché
    cy.contains("Dans la forêt").should("be.visible");

    // Saisit une quantité égale à zéro
    cy.get('[data-cy="detail-product-quantity"]')
      .clear()
      .type("0");

    // Clique sur Ajouter au panier
    cy.get('[data-cy="detail-product-add"]').click();

    // Attend la redirection automatique vers le panier
    cy.url().should("include", "/cart");

    // Vérifie que le produit est présent dans le panier
    cy.contains("Dans la forêt").should("be.visible");

    // Vérifie que la quantité zéro est présente dans le panier
    cy.get('[data-cy="cart-line"]')
      .contains("0")
      .should("be.visible");
  });


  it("Ajoute un produit au panier malgré un stock négatif", () => {
    // Ouvre la fiche produit Sentiments printaniers
    cy.visit("/#/products/3");

    // Vérifie que le produit est affiché
    cy.contains("Sentiments printaniers").should("be.visible");

    // Saisit une quantité de 1
    cy.get('[data-cy="detail-product-quantity"]')
      .clear()
      .type("1");

    // Clique sur Ajouter au panier
    cy.get('[data-cy="detail-product-add"]').click();

    // Attend la redirection automatique vers le panier
    cy.url().should("include", "/cart");

    // Vérifie que le produit est présent dans le panier
    cy.contains("Sentiments printaniers").should("be.visible");
  });
});