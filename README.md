# 🍔 RudaFood - Application de Gestion de Commandes Fast Food

> **Une application mobile moderne et complète pour la gestion des commandes de fast-food en temps réel**

## 📋 Table des Matières

- [Vue d'ensemble](#vue-densemble)
- [Architecture générale](#architecture-générale)
- [Technologies utilisées](#technologies-utilisées)
- [Structure du projet](#structure-du-projet)
- [Installation et configuration](#installation-et-configuration)
- [Fonctionnalités principales](#fonctionnalités-principales)
- [Gestion des états (Store)](#gestion-des-états-store)
- [Services](#services)
- [Communication en temps réel](#communication-en-temps-réel)
- [Authentification](#authentification)
- [Gestion des commandes](#gestion-des-commandes)
- [Gestion des menus](#gestion-des-menus)
- [Interface utilisateur](#interface-utilisateur)
- [Développement](#développement)
- [Scripts disponibles](#scripts-disponibles)

---

## 🎯 Vue d'ensemble

**RudaFood** est une application mobile hybride construite avec **Ionic** et **Angular** qui permet :

- **Aux clients** : Consulter les menus, passer des commandes, suivre l'état de leurs commandes en temps réel
- **Aux fast-foods** : Gérer les commandes reçues, mettre à jour les statuts, gérer les menus et les prix
- **Aux administrateurs** : Superviser l'ensemble du système avec des statistiques et des notifications

L'application utilise une architecture réactive avec **NgRx** pour la gestion d'état centralisée et **Socket.io** pour la communication en temps réel.

---

## 🏗️ Architecture générale

### Principes architecturaux

L'application suit une architecture **modulaire et réactive** basée sur :

1. **Séparation des responsabilités** : Chaque module gère un domaine spécifique
2. **Gestion d'état centralisée** : NgRx pour un état prévisible et traçable
3. **Communication réactive** : RxJS Observables et BehaviorSubjects
4. **Communication en temps réel** : Socket.io pour les mises à jour instantanées
5. **Services réutilisables** : Logique métier centralisée dans les services

---

## 🛠️ Technologies utilisées

### Frontend

| Technologie | Version | Utilisation |
|-------------|---------|------------|
| **Angular** | 16.0.0 | Framework principal |
| **Ionic** | 8.0.0 | Framework mobile hybride |
| **TypeScript** | 4.9.5 | Langage de programmation |
| **RxJS** | 7.5.0 | Programmation réactive |
| **NgRx** | 16.3.0 | Gestion d'état centralisée |
| **Socket.io Client** | 4.8.1 | Communication en temps réel |
| **Swiper** | 11.2.6 | Carrousels et sliders |
| **Moment.js** | 2.30.1 | Manipulation des dates |
| **Lodash** | 4.17.21 | Utilitaires JavaScript |

### Backend & Services

| Technologie | Utilisation |
|-------------|------------|
| **Firebase** | Authentification et stockage |
| **Socket.io** | Communication bidirectionnelle en temps réel |
| **Express.js** | Serveur backend |
| **MongoDB/Firestore** | Base de données |

---

## 📁 Structure du projet

```
rudafood/
├── src/
│   ├── app/                          # Code applicatif principal
│   │   ├── animations/               # Animations réutilisables
│   │   ├── components/               # Composants partagés
│   │   ├── homeComponents/           # Composants de la page d'accueil
│   │   ├── pages/                    # Pages principales
│   │   │   ├── auth/                # Authentification
│   │   │   ├── auth-with-google/    # Connexion Google
│   │   │   ├── auth-with-number/    # Connexion par numéro
│   │   │   └── auth-verify-number/  # Vérification du numéro
│   │   ├── tab1/                     # Onglet 1 - Fast Foods
│   │   ├── tab2/                     # Onglet 2 - Panier
│   │   ├── tab3/                     # Onglet 3 - Commandes
│   │   │   ├── commande/            # Gestion des commandes
│   │   │   │   ├── pending-cmd/     # Commandes en attente
│   │   │   │   ├── proccess-cmd/    # Commandes en cours
│   │   │   │   ├── finish-cmd/      # Commandes terminées
│   │   │   │   └── components/      # Composants de commande
│   │   │   ├── form/                # Formulaires
│   │   │   ├── historique/          # Historique des commandes
│   │   │   └── page-list-menu-fast-food/  # Liste des menus
│   │   ├── tab4/ & tab5/             # Onglets supplémentaires
│   │   ├── tabs/                     # Conteneur des onglets
│   │   ├── shared/                   # Composants partagés
│   │   ├── statComponents/           # Composants de statistiques
│   │   ├── pipes/                    # Pipes personnalisés
│   │   └── app.module.ts             # Module principal
│   │
│   ├── services/                     # Services métier
│   │   ├── orders/                   # Services de commandes
│   │   │   ├── get/                 # Récupération des commandes
│   │   │   ├── update/              # Mise à jour des commandes
│   │   │   ├── delivery/            # Gestion de la livraison
│   │   │   └── counters/            # Compteurs de commandes
│   │   ├── menu/                     # Services de menus
│   │   ├── FastFood/                 # Services fast-food
│   │   ├── socket/                   # Services Socket.io
│   │   ├── notifications/            # Services de notifications
│   │   ├── toast/                    # Services de toast
│   │   ├── requeToAuth.ts            # Requêtes d'authentification
│   │   ├── requeToUser.ts            # Requêtes utilisateur
│   │   ├── requeToMenu.ts            # Requêtes menus
│   │   └── requeToFastFood.ts        # Requêtes fast-food
│   │
│   ├── store/                        # NgRx Store (gestion d'état)
│   │   ├── order/                    # État des commandes
│   │   ├── menu/                     # État des menus
│   │   ├── fastFood/                 # État des fast-foods
│   │   ├── bonus/                    # État des bonus
│   │   └── indx.ts                   # Configuration du store
│   │
│   ├── utils/                        # Utilitaires
│   ├── assets/                       # Ressources statiques
│   ├── environments/                 # Configuration d'environnement
│   └── theme/                        # Thème Ionic
│
├── android/                          # Code natif Android
├── package.json                      # Dépendances du projet
├── angular.json                      # Configuration Angular CLI
├── capacitor.config.ts               # Configuration Capacitor
└── README.md                         # Ce fichier
```

---

## 🚀 Installation et configuration

### Prérequis

- **Node.js** ≥ 16.x
- **npm** ≥ 8.x
- **Ionic CLI** : `npm install -g @ionic/cli`
- **Angular CLI** : `npm install -g @angular/cli`
- **Capacitor CLI** : `npm install -g @capacitor/cli`

### Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd rudafood
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration Firebase**

Vérifiez que votre fichier `src/environments/environment.ts` contient les bonnes clés Firebase.

4. **Démarrer le serveur de développement**
```bash
npm start
```

L'application sera disponible à `http://localhost:4200`

### Configuration pour Android

```bash
# Ajouter la plateforme Android
ionic capacitor add android

# Compiler pour Android
ionic capacitor build android

# Ouvrir Android Studio
ionic capacitor open android
```

---

## ✨ Fonctionnalités principales

### 1. **Authentification Multi-Canaux**
- ✅ Connexion par email/mot de passe
- ✅ Connexion par numéro de téléphone (OTP)
- ✅ Connexion via Google
- ✅ Vérification du numéro de téléphone
- ✅ Gestion sécurisée des sessions

### 2. **Gestion des Fast Foods**
- ✅ Affichage des fast-foods disponibles
- ✅ Filtrage et recherche
- ✅ Détails du fast-food
- ✅ Gestion des menus par fast-food
- ✅ Mise à jour en temps réel

### 3. **Gestion des Menus**
- ✅ Affichage des menus avec images
- ✅ Gestion des prix multiples
- ✅ Descriptions détaillées
- ✅ Statut de disponibilité
- ✅ Ajout/modification/suppression (admin)
- ✅ Upload d'images multiples
- ✅ Tri automatique des extras

### 4. **Gestion du Panier**
- ✅ Ajout/suppression d'articles
- ✅ Modification des quantités
- ✅ Calcul automatique du total
- ✅ Gestion des extras et options
- ✅ Persistance du panier
- ✅ Validation avant la commande

### 5. **Gestion des Commandes**
- ✅ Passage de commandes
- ✅ Suivi en temps réel du statut
- ✅ Trois états : En attente, En cours, Terminée
- ✅ Historique des commandes
- ✅ Gestion des dates de livraison
- ✅ Notifications de changement d'état
- ✅ Remboursement Orange Money
- ✅ Gestion des périodes de livraison

### 6. **Communication en Temps Réel**
- ✅ Mises à jour instantanées des commandes
- ✅ Notifications push
- ✅ Notifications de changement de menu
- ✅ Synchronisation bidirectionnelle
- ✅ Gestion des déconnexions

### 7. **Système de Notifications**
- ✅ Notifications de commande
- ✅ Notifications de changement de statut
- ✅ Notifications de menu
- ✅ Notifications de bonus
- ✅ Notifications de transaction

### 8. **Système de Bonus**
- ✅ Gestion des bonus utilisateur
- ✅ Demandes de bonus
- ✅ Historique des bonus
- ✅ Validation des bonus

### 9. **Système de Transactions**
- ✅ Historique des transactions
- ✅ Détails des paiements
- ✅ Gestion des remboursements
- ✅ Suivi des montants

### 10. **Statistiques et Rapports**
- ✅ Nombre de commandes
- ✅ Revenu total
- ✅ Statistiques par période
- ✅ Graphiques de performance

---

## 🗂️ Gestion des états (Store)

L'application utilise **NgRx** pour une gestion d'état centralisée.

### Structure du Store

```
AppState
├── orders
│   ├── fastFoodOrders: FastFoodOrder[]
│   ├── userOrders: UserOrder[]
│   └── filteredOrders: Order[]
├── menus
│   ├── allMenus: Menu[]
│   └── fastFoodMenus: Menu[]
├── fastFoods
│   ├── allFastFoods: FastFood[]
│   └── selectedFastFood: FastFood
├── bonus
│   ├── userBonus: Bonus[]
│   └── bonusRequests: BonusRequest[]
└── notifications
    ├── allNotifications: Notification[]
    └── unreadCount: number
```

### Actions principales

#### Orders
- `addFastFoodOrder` : Ajouter une commande fast-food
- `updateFastFoodOrder` : Mettre à jour une commande
- `removeFastFoodOrder` : Supprimer une commande
- `setFilteredOrders` : Définir les commandes filtrées

#### Menus
- `addMenu` : Ajouter un menu
- `updateMenu` : Mettre à jour un menu
- `removeMenu` : Supprimer un menu
- `addMenuToFastFood` : Ajouter un menu à un fast-food

---

## 🔧 Services

### Services de Commandes

#### `getOrdersService`
Récupère les commandes du serveur.

#### `OrderCountersService`
Gère les compteurs de commandes.

#### `OrderDataService`
Gère les données des commandes.

### Services de Menus

#### `requeToMenu`
Requêtes pour les menus (CRUD).

### Services d'Authentification

#### `requeToAuth`
Gère l'authentification (email, numéro, Google).

### Services Socket.io

- **`user-order-socket.service.ts`** : Commandes utilisateur en temps réel
- **`fastfood-order-socket.service.ts`** : Commandes fast-food en temps réel
- **`menu-socket.service.ts`** : Menus en temps réel
- **`notification-socket.service.ts`** : Notifications en temps réel

### Services Utilisateur

#### `requeToUser`
Gère les données utilisateur (profil, préférences).

### Services de Notifications

#### `ToastService`
Affiche les notifications toast.

---

## 🔌 Communication en temps réel

L'application utilise **Socket.io** pour la communication bidirectionnelle en temps réel.

### Événements Socket

#### Commandes
- `newFastFoodOrder` : Nouvelle commande reçue
- `updateFastFoodOrder` : Commande mise à jour
- `removeFastFoodOrder` : Commande supprimée
- `newUserOrder` : Nouvelle commande utilisateur
- `updateUserOrder` : Commande utilisateur mise à jour

#### Menus
- `newGlobalMenu` : Nouveau menu global
- `newFastFoodMenu` : Nouveau menu fast-food
- `updateMenu` : Menu mis à jour
- `removeMenu` : Menu supprimé

#### Notifications
- `newNotification` : Nouvelle notification
- `updateNotification` : Notification mise à jour

---

## 🔐 Authentification

### Méthodes d'authentification

#### 1. Email/Mot de passe
Connexion et inscription via Firebase Authentication.

#### 2. Numéro de téléphone (OTP)
Envoi d'un code OTP au numéro fourni, puis vérification.

#### 3. Google
Connexion via Google OAuth.

---

## 📦 Gestion des Commandes

### États des commandes

1. **En attente (Pending)** : Commande reçue, en attente de traitement
2. **En cours (Processing)** : Commande en préparation
3. **Terminée (Finished)** : Commande prête, en cours de livraison

### Composants de commande

- **`pending-cmd`** : Affiche les commandes en attente
- **`proccess-cmd`** : Affiche les commandes en cours
- **`finish-cmd`** : Affiche les commandes terminées

### Gestion des dates

Les commandes sont filtrées par date de livraison. Chaque type de commande a ses propres ensembles de dates :
- `orderDatesPending` : Dates des commandes en attente
- `orderDatesProcessing` : Dates des commandes en cours
- `orderDatesFinished` : Dates des commandes terminées

---

## 🎨 Gestion des Menus

### Fonctionnalités

- **Création** : Ajout de nouveaux menus avec images, prix et descriptions
- **Modification** : Édition des menus existants
- **Suppression** : Suppression des menus
- **Images multiples** : Support de jusqu'à 3 images par menu
- **Prix multiples** : Gestion de plusieurs prix pour un même menu
- **Statut** : Disponible/Indisponible
- **Extras** : Tri automatique des extras par longueur de nom

### Composant `new-menu`

Formulaire complet pour créer/modifier des menus avec :
- Upload d'images multiples
- Gestion des prix
- Descriptions détaillées
- Statut de disponibilité

---

## 💻 Développement

### Scripts disponibles

```bash
# Démarrer le serveur de développement
npm start

# Compiler le projet
npm run build

# Compiler en mode production
npm run build -- --configuration production

# Exécuter les tests
npm test

# Linter le code
npm run lint

# Surveiller les changements
npm run watch
```

### Structure des composants

Chaque composant suit cette structure :

```
component-name/
├── component-name.component.ts       # Logique du composant
├── component-name.component.html     # Template
├── component-name.component.scss     # Styles
└── component-name.component.spec.ts  # Tests
```

### Conventions de code

- **Nommage** : camelCase pour les variables/méthodes, PascalCase pour les classes
- **Modules** : Un module par feature
- **Services** : Un service par responsabilité
- **Composants** : Composants petits et réutilisables
- **Styles** : SCSS avec variables de thème

---

## 🐛 Problèmes connus et TODO

### Problèmes à résoudre

1. **Gestion de la connexion** : Améliorer la gestion des erreurs de connexion
2. **Vérification du numéro** : Filtrer et valider les numéros de téléphone
3. **Blocage des instructions** : Implémenter le blocage d'instructions une fois exécutées
4. **Chargement des données** : Optimiser le chargement des données spécifiques par utilisateur
5. **Gestion des erreurs Firebase** : Améliorer les messages d'erreur

### Fonctionnalités à implémenter

- [ ] Popup de confirmation pour les modifications
- [ ] Gestion hors ligne avec cache local
- [ ] Amélioration des notifications
- [ ] Système de notation des fast-foods
- [ ] Historique détaillé des transactions
- [ ] Intégration de paiement Orange Money
- [ ] Gestion des promotions et codes promo
- [ ] Système de fidélité amélioré
- [ ] Chat en temps réel avec les fast-foods
- [ ] Localisation GPS pour la livraison

---

## 📱 Plateformes supportées

- **Web** : Chrome, Firefox, Safari, Edge
- **Mobile** : iOS (via Capacitor), Android (via Capacitor)
- **Responsive** : Design adaptatif pour tous les appareils

---

## 🔒 Sécurité

- **Authentification** : Firebase Authentication
- **Stockage sécurisé** : Capacitor Secure Storage
- **HTTPS** : Toutes les communications sont chiffrées
- **Tokens** : Gestion sécurisée des tokens d'authentification
- **Validation** : Validation côté client et serveur

---

## 📞 Support et Contact

Pour toute question ou problème :

- **Email** : support@rudafood.com
- **GitHub Issues** : [Créer une issue](https://github.com/rudafood/issues)
- **Documentation** : [Wiki du projet](https://github.com/rudafood/wiki)

---

## 📄 Licence

Ce projet est sous licence propriétaire. Tous les droits sont réservés.

---

## 👥 Contributeurs

- **Développeur Principal** : Valdoblair
- **Équipe de Développement** : RUDAVO Team

---

## 🎉 Remerciements

Merci à tous les contributeurs et utilisateurs qui ont aidé à améliorer cette application !

---

**Dernière mise à jour** : 17 Novembre 2025
**Version** : 0.0.1
