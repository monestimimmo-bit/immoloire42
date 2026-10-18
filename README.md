# ImmoLoire42 : site de mise en relation pour l'estimation immobilière dans la Loire (42)

Site statique (HTML, CSS, JavaScript) destiné à être hébergé sur **GitHub Pages**, sous le domaine **immoloire42.fr**.

ImmoLoire42 met en relation les vendeurs de biens immobiliers de la Loire avec des conseillers immobiliers locaux, qui donnent un avis de valeur lors d'un rendez-vous à domicile, gratuit et sans engagement.

## Contenu du dépôt

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil : présentation, formulaire d'estimation, liste des communes |
| `qui-sommes-nous.html` | Présentation du service |
| `blog.html` | Liste des guides locaux |
| `vendre-a-<commune>.html` (20 fichiers) | Un guide par commune (les 20 communes les plus peuplées de la Loire) |
| `confidentialite.html`, `mentions-legales.html` | Pages légales (à compléter, voir plus bas) |
| `styles.css` | Feuille de style de tout le site |
| `app.js` | Menu mobile, liste et recherche des communes, validation et envoi du formulaire |
| `cookies.js` | Bandeau de cookies (tarteaucitron.js) et Google Analytics |
| `favicon.svg` | Icône du site |
| `sitemap.xml`, `robots.txt` | Référencement (Google Search Console) |
| `CNAME` | Nom de domaine pour GitHub Pages (`immoloire42.fr`) |

Tous les fichiers sont à la **racine** du dépôt, sans sous-dossier.

## Mise en ligne sur GitHub Pages

1. Créez un dépôt GitHub (public), puis envoyez-y tous les fichiers (« Add file » puis « Upload files », moins de 100 fichiers par envoi).
2. Dans **Settings > Pages**, choisissez « Deploy from a branch », la branche `main` et le dossier `/ (root)`.
3. Dans **Custom domain**, saisissez `immoloire42.fr` (sans `www` ni `https://`) et enregistrez.
4. Chez votre registrar, dans la zone DNS du domaine :
   - quatre enregistrements **A** (sous-domaine vide) : `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` ;
   - un enregistrement **CNAME** `www` vers `<votre-nom-d-utilisateur>.github.io.` (avec le point final) ;
   - supprimez les anciennes entrées A, AAAA ou CNAME qui pointeraient ailleurs, sans toucher aux entrées MX et TXT utiles aux e-mails.
5. Quand GitHub valide le domaine, cochez **Enforce HTTPS** dans Settings > Pages. Comptez de quelques minutes à 24 heures.

## Formulaire d'estimation (Formspree)

- Le formulaire envoie les demandes à Formspree : `https://formspree.io/f/xkjowyob` (attribut `action` du formulaire dans `index.html`).
- Tous les champs sont obligatoires. L'adresse e-mail doit être complète (par exemple `prenom.nom@exemple.fr`) et le téléphone doit être un numéro français complet à 10 chiffres (par exemple `06 12 34 56 78`, ou `+33 6 12 34 56 78`).
- Si un champ est oublié ou incorrect, il est entouré de rouge avec un message, et un résumé liste les champs à corriger.
- Pour recevoir les demandes ailleurs, changez l'identifiant dans `index.html`, dans la ligne `<form ... action="https://formspree.io/f/...">`.
- Les demandes sont aussi consultables dans votre tableau de bord Formspree. Vérifiez les limites mensuelles de votre forfait.

## Cookies et Google Analytics

1. Créez une propriété Google Analytics 4 sur analytics.google.com, avec un flux de données Web pour `https://immoloire42.fr`.
2. Copiez l'identifiant de mesure (de la forme `G-XXXXXXXXXX`).
3. Dans `cookies.js`, remplacez `G-XXXXXXXXXX` par cet identifiant (première ligne de code).
4. Ne collez pas le code de suivi fourni par Google : le bandeau charge Google Analytics seulement après le consentement du visiteur.
5. Test : ouvrez le site en navigation privée, cliquez sur « Tout accepter », puis regardez Analytics > Rapports > Temps réel.

Le lien « Gérer les cookies » est dans le pied de page de chaque page ; le texte correspondant est dans `confidentialite.html`.

## À compléter avant la mise en ligne

Dans `mentions-legales.html` et `confidentialite.html`, remplacez tout ce qui est entre crochets : identité de l'éditeur, SIRET, adresse e-mail de contact, rémunération du service, conseillers partenaires (carte professionnelle, garantie financière, assurance, médiateur), durée de conservation des données.

## Référencement (Google Search Console)

1. Ajoutez une propriété de type « Domaine » pour `immoloire42.fr` et validez-la avec l'enregistrement TXT demandé (à ajouter dans la zone DNS).
2. Dans **Sitemaps**, envoyez `https://immoloire42.fr/sitemap.xml`.
3. Dans l'inspection d'URL, demandez l'indexation de la page d'accueil et de quelques guides.

## Modifier le site

- **Textes d'une commune** : modifiez directement le fichier `vendre-a-<commune>.html`.
- **Ajouter une commune** : dupliquez un fichier `vendre-a-*.html` en changeant le nom, le titre, la description, l'adresse canonique et le contenu ; ajoutez la commune dans la liste `COMMUNES` au début de `app.js` (nom, identifiant du fichier, code postal) et son adresse dans `sitemap.xml`.
- **Couleurs et styles** : `styles.css` (couleurs dans la section `:root`).
- Après chaque modification, attendez une à deux minutes puis rechargez la page avec Ctrl + Maj + R.

## Remarques

- Les chiffres de population viennent de l'INSEE (API Géo). Les ordres de grandeur de prix proviennent de sites d'estimation consultés en 2026 : ils sont indicatifs et à mettre à jour.
- Les polices (Google Fonts), les images (Unsplash) et le gestionnaire de cookies (cdnjs) sont chargés depuis des services externes.
- Une estimation est un avis de valeur, pas une garantie de prix de vente. Faites valider les mentions légales et la politique de confidentialité par un professionnel.
