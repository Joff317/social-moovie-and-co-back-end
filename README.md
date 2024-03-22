# Social Watch Backend

Welcome to the backend repository for the "Social Watch" project!

This backend is built with Node.js, MongoDB, and Express.

## Getting Started

To get started with the backend, follow these steps:

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/votre-utilisateur/social-watch-backend.git

## FrontEnd

The frontend of this project is powered by Vite React & Tailwind. You can find the frontend code and further instructions in the [frontend repository](https://github.com/Joff317/front-final-project).

## Issues

If you encounter any issues or have suggestions for improvement, please open an issue in the GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).

# Documentation de l'API

Cette documentation décrit les différentes routes et fonctionnalités disponibles dans l'API. L'API fournit des fonctionnalités pour la gestion d'audiovisuels, de commentaires associés à ces audiovisuels, ainsi que la gestion des utilisateurs.

## Routes AudioVisual

### Créer un nouvel audiovisuel

- **URL :** `/audiovisual`
- **Méthode HTTP :** `POST`
- **Authentification requise :** Oui
- **Description :** Permet de créer un nouvel audiovisuel.
- **Paramètres requis dans le corps de la requête :**
  - `categorie` : Catégorie de l'audiovisuel.
  - `synopsis` : Synopsis de l'audiovisuel.
  - `title` : Titre de l'audiovisuel.
  - `genre` : Genre de l'audiovisuel.
  - `author` : Auteur de l'audiovisuel.
  - `date` : Date de publication de l'audiovisuel.
  - `duration` : Durée de l'audiovisuel.
  - `image` : Image de l'audiovisuel.
- **Réponse en cas de succès :** Statut `201 Created`
  ```json
  {
    "message": "Audio Visual created",
    "data": { "createdAudioVisual": { "audioVisualData" } }
  }

### Récupérer tous les audiovisuels

- **URL :** `/audiovisual`
- **Méthode HTTP :** `GET`
- **Description :** Permet de récupérer tous les audiovisuels.
- **Réponse en cas de succès :** Statut `200 OK`
  ```json
  {
    "message": "All audiovisual successfully get",
    "audioVisuals": [{ "audioVisualData" }]
  }

### Récupérer les audiovisuels publiés par un utilisateur spécifique

- **URL :** `/audiovisual/publisher`
- **Méthode HTTP :** `GET`
- **Authentification requise :** Oui
- **Description :** Permet de récupérer les audiovisuels publiés par l'utilisateur connecté.
- **Réponse en cas de succès :** Statut `200 OK`
  ```json
  {
    "message": "AudioVisual publisher found by ID",
    "audioVisual": [{ "audioVisualData" }]
  }

### Rechercher des audiovisuels par titre

- **URL :** `/audiovisual/searchbar/search`
- **Méthode HTTP :** `GET`
- **Description :** Permet de rechercher des audiovisuels par titre.
- **Paramètre requis dans la requête :**
  - `query` : Terme de recherche.
- **Réponse en cas de succès :** Statut `200 OK`
  ```json
  {
    "message": "Search results for \"query\"",
    "audioVisuals": [{ "audioVisualData" }]
  }


### Filtrer les audiovisuel 

- **URL :** `/audiovisual/filtered/mixed`
- **Méthode HTTP :** `GET`
- **Description :** Permet de filtrer les audiovisuels en fonction de la catégorie et/ou du genre.
- **Paramètres facultatifs dans la requête :**
  - `categorie` : Catégorie de l'audiovisuel.
  - `genre` : Genre de l'audiovisuel.
- **Réponse en cas de succès :** Statut `200 OK`
  ```json
  {
    "message": "Filtered audiovisuals successfully retrieved",
    "audioVisuals": [{ "audioVisualData" }]
  }

### Récupérer un audiovisuel par ID

- **URL :** `/audiovisual/:audiovisualId`
- **Méthode HTTP :** `GET`
- **Description :** Permet de récupérer un audiovisuel spécifique par son ID.
- **Paramètre requis dans l'URL :**
  - `audiovisualId` : ID de l'audiovisuel.
- **Réponse en cas de succès :** Statut `200 OK`
  ```json
  {
    "message": "AudioVisual found by ID",
    "audioVisual": { "audioVisualData" }
  }

## Routes Commentary

### Créer un commentaire pour un audiovisuel

- **URL :** `/commentary/:audiovisualId`
- **Méthode HTTP :** `POST`
- **Authentification requise :** Oui
- **Description :** Permet de créer un commentaire pour un audiovisuel spécifique.
- **Paramètres requis dans la requête :**
  - `audiovisualId` : ID de l'audiovisuel.
  - `text` : Contenu du commentaire.
- **Réponse en cas de succès :** Statut `201 Created`
  ```json
  {
    "message": "Commentary created",
    "data": { "createdCommentaryData" }
  }

### Récupérer les commentaires pour un audiovisuel

- **URL :** `/commentary/:audiovisualId`
- **Méthode HTTP :** `GET`
- **Authentification requise :** Oui
- **Description :** Permet de récupérer les commentaires associés à un audiovisuel spécifique.
- **Paramètre requis dans l'URL :**
  - `audiovisualId` : ID de l'audiovisuel.
- **Réponse en cas de succès :** Statut `200 OK`
  ```json
  {
    "message": "Commentary retrieved",
    "comments": [{ "commentData" }],
    "audioVisual": { "audioVisualData" }
  }

### Mettre à jour un commentaire

- **URL :** `/commentary/:audiovisualId/:commentId`
- **Méthode HTTP :** `PUT`
- **Authentification requise :** Oui
- **Description :** Permet de mettre à jour un commentaire spécifique.
- **Paramètres requis dans l'URL :**
  - `audiovisualId` : ID de l'audiovisuel associé au commentaire.
  - `commentId` : ID du commentaire à mettre à jour.
- **Paramètre requis dans le corps de la requête :**
  - `text` : Nouveau contenu du commentaire.
- **Réponse en cas de succès :** Statut `201 Created`
  ```json
  {
    "message": "Commentary updated",
    "data": { "updatedCommentaryData" }
  }

### Supprimer un commentaire

- **URL :** `/commentary/:audiovisualId/:commentId`
- **Méthode HTTP :** `DELETE`
- **Authentification requise :** Oui
- **Description :** Permet de supprimer un commentaire spécifique.
- **Paramètres requis dans l'URL :**
  - `audiovisualId` : ID de l'audiovisuel associé au commentaire.
  - `commentId` : ID du commentaire à supprimer.
- **Réponse en cas de succès :** Statut `201 Created`
  ```json
  {
    "message": "Commentary is deleted",
    "data": { "deletedCommentData" }
  }  

### Créer un utilisateur

- **URL :** `/users`
- **Méthode HTTP :** `POST`
- **Authentification requise :** Non
- **Description :** Permet de créer un nouvel utilisateur.
- **Paramètres requis dans le corps de la requête :**
  - `pseudo` : Pseudo de l'utilisateur.
  - `email` : Adresse e-mail de l'utilisateur.
  - `password` : Mot de passe de l'utilisateur.
- **Réponse en cas de succès :** Statut `201 Created`
  ```json
  {
    "message": "User created",
    "token": "yourAuthToken"
  }

### Ajouter un audiovisuel aux favoris d'un utilisateur

- **URL :** `/users/addFavorite/:audiovisualId`
- **Méthode HTTP :** `POST`
- **Authentification requise :** Oui
- **Description :** Permet à un utilisateur d'ajouter un audiovisuel à sa liste de favoris.
- **Paramètres requis dans l'URL :**
  - `audiovisualId` : ID de l'audiovisuel à ajouter aux favoris.
- **Réponse en cas de succès :** Statut `201 Created`
  ```json
  {
    "message": "Audiovisual successfully added to favorites"
  }


### Supprimer un audiovisuel des favoris d'un utilisateur

- **URL :** `/users/removeFavorite/:audiovisualId`
- **Méthode HTTP :** `DELETE`
- **Authentification requise :** Oui
- **Description :** Permet à un utilisateur de supprimer un audiovisuel de sa liste de favoris.
- **Paramètres requis dans l'URL :**
  - `audiovisualId` : ID de l'audiovisuel à supprimer des favoris.
- **Réponse en cas de succès :** Statut `201 Created`
  ```json
  {
    "message": "AudioVisual removed from favorites"
  }

### Récupérer les favoris d'un utilisateur

- **URL :** `/users/favorites`
- **Méthode HTTP :** `GET`
- **Authentification requise :** Oui
- **Description :** Permet de récupérer la liste des audiovisuels favoris d'un utilisateur.
- **Réponse en cas de succès :** Statut `200 OK`
  ```json
  {
    "message": "Favorites audiovisual return",
    "favorite": [{ "favoriteAudioVisualData" }]
  }  

### Lire tous les utilisateurs

- **URL :** `/users`
- **Méthode HTTP :** `GET`
- **Authentification requise :** Oui
- **Description :** Permet de récupérer la liste de tous les utilisateurs.
- **Réponse en cas de succès :** Statut `200 OK`
  ```json
  {
    "message": "All user was getting",
    "data": [{ "userData" }]
  }  

### Récupérer un utilisateur unique

- **URL :** `/users/uniqueuser`
- **Méthode HTTP :** `GET`
- **Authentification requise :** Oui
- **Description :** Permet de récupérer les informations d'un utilisateur spécifique.
- **Réponse en cas de succès :** Statut `200 OK`
  ```json
  {
    "message": "User with id: userId was successfully found",
    "user": { "userData" }
  }

### Mettre à jour un utilisateur

- **URL :** `/users/:id`
- **Méthode HTTP :** `PUT`
- **Authentification requise :** Oui
- **Description :** Permet de mettre à jour les informations d'un utilisateur.
- **Paramètres requis dans l'URL :**
  - `id` : ID de l'utilisateur à mettre à jour.
- **Paramètres requis dans le corps de la requête :**
  - `pseudo` : Nouveau pseudo de l'utilisateur.
  - `email` : Nouvelle adresse e-mail de l'utilisateur.
  - `password` : Nouveau mot de passe de l'utilisateur.
- **Réponse en cas de succès :** Statut `201 Created`
  ```json
  {
    "message": "User updated",
    "email": "updatedUserEmail"
  }  

### Supprimer un utilisateur

```markdown
- **URL :** `/users/:id`
- **Méthode HTTP :** `DELETE`
- **Authentification requise :** Non
- **Description :** Permet de supprimer un utilisateur.
- **Paramètres requis dans l'URL :**
  - `id` : ID de l'utilisateur à supprimer.
- **Réponse en cas de succès :** Statut `201 Created`
  ```json
  {
    "message": "user userEmail is deleted"
  }