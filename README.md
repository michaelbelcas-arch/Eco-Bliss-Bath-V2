# Présentation

Eco Bliss Bath est une application e-commerce de produits de bien-être.

Ce projet a pour objectif d’automatiser plusieurs scénarios de test avec Cypress afin de vérifier :

- le bon fonctionnement de l’API ;
- les fonctionnalités principales du site ;
- la connexion utilisateur ;
- la gestion du panier ;
- la sécurité face aux injections XSS.


# Prérequis

Avant de lancer le projet, vous devez avoir installé :

- Docker
- NodeJS
- npm

# Installation

Cloner le projet :

git clone https://github.com/OpenClassrooms-Student-Center/Eco-Bliss-Bath-V2.git
cd Eco-Bliss-Bath-V2

Démarrer le backend

À la racine du projet :

docker compose up -d

L’API est disponible sur :

http://localhost:8081

Démarrer le frontend

Se rendre dans le dossier frontend :

cd frontend

Installer les dépendances :

npm install

Lancer l’application :

npm run start

Le site est disponible sur :

http://localhost:4200

Lancer les tests Cypress

Depuis la racine du projet :

npx cypress open

Puis sélectionner :

E2E Testing

Lancer ensuite les fichiers de test souhaités.

Structure des tests
cypress/e2e/
│
├── 01-api.cy.js
├── 02-smoke.cy.js
├── 03-xss.cy.js
└── functional test/
    ├── 04-cart.cy.js
    └── 05-login.cy.js

Description des tests

01-api.cy.js

Tests API réalisés directement sur le backend.

Vérifications principales :

connexion utilisateur ;
récupération d’un token JWT ;
accès au panier avec token ;
récupération d’une fiche produit ;
ajout d’un produit au panier ;
ajout d’un avis ;
contrôle d’accès sans autorisation.

02-smoke.cy.js

Tests rapides permettant de vérifier que le site démarre correctement.

Vérifications principales :

affichage de la page d’accueil ;
accès à la page produits ;
affichage des produits ;
présence des boutons “Consulter” ;
navigation principale.

03-xss.cy.js

Tests de sécurité contre les injections XSS.

Payload utilisé :

<script>alert("XSS")</script>

Scénarios testés :

injection XSS dans les avis ;
injection XSS dans les champs du panier.

Le test vérifie qu’aucune alerte JavaScript ne s’exécute.

04-cart.cy.js

Tests fonctionnels du panier.

Scénarios testés :

connexion utilisateur ;
ajout d’un produit au panier ;
suppression d’un produit du panier ;
ajout d’une quantité supérieure au stock disponible ;
ajout d’une quantité égale à zéro ;
ajout d’un produit avec stock négatif.

Un afterEach() permet de nettoyer le panier après chaque test.

05-login.cy.js

Tests fonctionnels de connexion.

Scénarios testés :

connexion avec identifiants valides ;
connexion avec email invalide ;
connexion avec mot de passe invalide ;
connexion avec données générées par Faker ;
déconnexion utilisateur.
Utilisation de Faker

Faker est utilisé pour générer des données dynamiques dans certains tests :

emails ;
mots de passe ;
titres ;
commentaires.

Exemple :

faker.internet.email()
Authentification JWT

Certains tests utilisent une connexion API afin de récupérer un token JWT.

Le token est ensuite injecté dans le localStorage pour simuler un utilisateur connecté :

win.localStorage.setItem("user", token)
Remarques

Certains tests permettent de mettre en évidence des anomalies fonctionnelles, notamment sur la gestion du panier :

ajout d’une quantité supérieure au stock ;
ajout d’une quantité égale à zéro ;
ajout d’un produit avec stock négatif.

Ces comportements sont documentés dans le bilan de campagne de test.

Commandes utiles

Relancer le backend proprement :

docker compose down
docker compose up -d

Réinitialiser complètement la base Docker :

docker compose down -v
docker compose up -d

Attention : la commande avec -v supprime les volumes Docker.