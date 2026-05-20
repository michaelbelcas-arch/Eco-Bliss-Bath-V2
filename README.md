
<div align="center">

# OpenClassrooms - Eco Bliss Bath

Projet d'automatisation de tests E2E avec Cypress

</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/Cypress-E2E-brightgreen">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
</p>

---

# Présentation du projet

Eco Bliss Bath est une application e-commerce permettant la consultation et l’achat de produits de bien-être.

Ce projet a pour objectif de mettre en place une stratégie complète de tests automatisés avec Cypress afin de :

- sécuriser l'application
- automatiser les scénarios utilisateurs
- tester l’API backend
- détecter les régressions
- vérifier les fonctionnalités critiques
- identifier les failles de sécurité potentielles

---

# Technologies utilisées

## Frontend
- Angular 13

## Backend
- Symfony 6.2
- API REST

## Base de données
- MariaDB

## Tests automatisés
- Cypress
- Faker

## Environnement
- Docker
- NodeJS

---

# Prérequis

Pour démarrer l’application, vous devez installer :

- Docker
- NodeJS

---

# Installation et démarrage

## 1. Cloner le projet

```bash
git clone https://github.com/OpenClassrooms-Student-Center/Eco-Bliss-Bath-V2.git

cd Eco-Bliss-Bath-V2
````

---

# Démarrage du backend + base de données

Lancer les containers Docker :

```bash
docker compose up -d
```

---

# Démarrage du frontend

Se rendre dans le dossier frontend :

```bash
cd ./frontend
```

Installer les dépendances :

```bash
npm install
```

Démarrer l’application Angular :

```bash
npm run start
```

Le frontend sera accessible à l’adresse :

```txt
http://localhost:4200
```

---

# Lancer Cypress

Depuis la racine du projet :

```bash
npx cypress open
```

Puis sélectionner :

```txt
E2E Testing
```

---

# Structure des tests

```txt
cypress/e2e/
│
├── 01-api.cy.js
├── 02-smoke.cy.js
├── 03-xss.cy.js
└── 04-functional.cy.js
```

---

# Description des tests

# 1. Tests API

Fichier :

```txt
01-api.cy.js
```

Ces tests permettent de tester directement le backend sans passer par l’interface graphique.

## Vérifications effectuées

* connexion utilisateur
* récupération du panier
* récupération d’un produit
* ajout d’un produit au panier
* ajout d’un avis
* gestion des erreurs 401

---

# 2. Smoke Tests

Fichier :

```txt
02-smoke.cy.js
```

Les smoke tests permettent de vérifier rapidement que les fonctionnalités principales du site sont accessibles.

## Vérifications effectuées

* affichage du bouton connexion
* accès à la section produits
* affichage des boutons consulter
* affichage des produits

---

# 3. Tests XSS

Fichier :

```txt
03-xss.cy.js
```

Ces tests permettent de vérifier la sécurité de l’application contre les injections XSS.

## Exemple de payload testé

```html
<script>alert("XSS")</script>
```

## Objectif

Vérifier que les balises `<script>` ne sont pas acceptées par le backend.

---

# 4. Tests fonctionnels

Fichier :

```txt
04-functional.cy.js
```

Ces tests reproduisent le comportement réel d’un utilisateur connecté.

## Vérifications effectuées

* connexion utilisateur
* authentification JWT
* sauvegarde du token dans le localStorage
* ajout d’un produit au panier
* accès au panier

---

# Utilisation de Faker

La librairie Faker est utilisée afin de générer automatiquement des données de test dynamiques :

* commentaires
* emails
* données utilisateurs
* textes aléatoires

Exemple :

```js
faker.lorem.sentence()
```

Cette approche permet :

* d’éviter les données statiques
* de rendre les tests plus réalistes
* de limiter les conflits entre tests

---

# Authentification JWT

L’application utilise un système d’authentification JWT.

Après connexion :

* le backend génère un token
* le frontend stocke ce token dans le localStorage

Exemple :

```js
localStorage.setItem("user", token)
```

Les tests Cypress injectent automatiquement ce token afin de simuler un utilisateur connecté.

---

# Difficultés rencontrées

Plusieurs problématiques ont été rencontrées durant le projet :

* gestion des sélecteurs Cypress
* contenu dynamique Angular
* synchronisation des requêtes API
* gestion du JWT
* stockage du token dans le localStorage
* éléments non visibles dans le DOM
* mise en place des tests XSS

---

# Compétences développées

* automatisation de tests E2E
* tests API
* tests fonctionnels
* tests de sécurité
* utilisation de Cypress
* debugging frontend/backend
* gestion de JWT
* utilisation du localStorage
* génération de données avec Faker

---
