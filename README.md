# Gestion des Stocks et Analyse Statistique - (2024)

**Module : Résilience Technologique - Projet Angular + Django**

---

## **Description**
Une application web complète et interactive pour la gestion des stocks et l’analyse statistique des ventes. Elle propose des outils avancés pour gérer les stocks, identifier les incohérences et analyser les données via des graphiques dynamiques et des tableaux interactifs.

Développée avec **Angular** pour le front-end et **Django** pour le back-end, l'application combine un système de notifications intelligentes, des graphiques détaillés, et des fonctionnalités CRUD (Create, Read, Update, Delete) pour offrir une solution robuste et évolutive.

---

## **Spécifications Techniques**
- **Framework Front-End** : Angular
- **Framework Back-End** : Django
- **Authentification Sécurisée** : Gestion des utilisateurs via JWT (JSON Web Tokens)
- **Base de Données Mock** : JSON statique simulant les données
- **Graphiques Dynamiques** : Bibliothèques comme Chart.js pour les visualisations interactives
- **Communication Front/Back** : API REST (Django REST Framework)

---

## **Fonctionnalités**

### **Statistiques & Analyse**
1. **Graphiques Dynamiques** :
   - Visualisation interactive des données avec des graphiques en temps réel.
   - Informations supplémentaires au survol du curseur (e.g., valeurs, dates, tendances).
   - **Filtres avancés** :
     - Période : année, semestre, trimestre, mois.
     - Type : promotions, catégories spécifiques.
   - Calculs automatiques de tendances et moyennes mobiles.

2. **Tableaux Interactifs** :
   - Données présentées sous forme de tableau dynamique.
   - Tri et recherche instantanés par colonne.
   - Export des données filtrées pour une analyse approfondie.

---

### **Gestion des Stocks**
1. **CRUD Complet** :
   - Ajout, modification, suppression des articles en stock.
   - Gestion centralisée des données pour éviter les doublons.

2. **Notifications Intelligentes** :
   - Cellules de tableau devenant rouges en cas d’incohérence ou de niveau critique de stock.
   - Alertes automatiques en cas de manque ou d’excédent de stock.

3. **Suivi des Mouvements de Stock** :
   - Historique des entrées et sorties.
   - Indicateurs clés affichant les niveaux critiques en un coup d’œil.

---

## **Structure de Données**
Les données sont gérées par une base mock (JSON statique) simulant des interactions en temps réel :

- **Produits** :
  - Nom, catégorie, quantité disponible, seuil critique, date de mise à jour.
- **Transactions** :
  - Détails des mouvements (type : entrée/sortie, quantité, produit concerné).
- **Notifications** :
  - Historique des alertes générées (type : incohérence, seuil atteint).

---

## **Remarques**
- **Ergonomie** : L'application a été conçue pour une utilisation fluide, avec des interfaces épurées et des interactions intuitives.
- **Flexibilité** : La structure du code est modulaire, permettant une extension facile des fonctionnalités.
- **Performances** : Les données de tableaux et graphiques sont chargées et filtrées dynamiquement pour garantir la réactivité, même avec un grand volume de données.

---

## **Wireframes et Captures d’écran**
Les wireframes ont guidé le design initial, et les captures d’écran mettent en évidence :
- La gestion CRUD des stocks.
- Les graphiques interactifs avec filtres.
- Les notifications intelligentes dans les tableaux.

---

### **About**
Un outil puissant et intuitif pour gérer les stocks et analyser les statistiques des ventes, intégrant des graphiques dynamiques, des tableaux interactifs et des notifications intelligentes.
