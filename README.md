# Dashboard Nanoparticules

Interface de visualisation et d'analyse des données de stabilité des nanoparticules. Cette application web permet de visualiser et d'analyser les résultats de tests effectués sur différentes nanoparticules, en utilisant différents buffers et sur plusieurs semaines.

## Fonctionnalités

- Visualisation des résultats des tests UVVIS, FTIR, DLS, ELISA, et des images de cellules
- Suivi de l'évolution des paramètres dans le temps
- Comparaison des résultats entre différents buffers
- Interface intuitive et moderne avec navigation simplifiée
- Exploration approfondie des données avec des graphiques interactifs
- Analyse des tendances sur les paramètres clés

## Technologies utilisées

- React 19
- Chakra UI pour l'interface utilisateur
- Recharts pour les graphiques et visualisations
- React Router pour la navigation

## Installation et démarrage

1. Clonez ce dépôt
2. Installez les dépendances avec `npm install`
3. Lancez l'application en mode développement avec `npm run dev`

## Structure des données

Le fichier `all_data.json` contient toutes les données structurées comme suit:
- Premier niveau : batchs (1 à 3)
- Deuxième niveau : semaines (1 à 6)
- Troisième niveau : buffers ("buffer 1" à "buffer 6" + "calix")
- Quatrième niveau : types de tests, puis résultats
  - Les résultats contenant la clé "file" indiquent qu'une image est disponible dans le dossier `public/images`
  - Pour les cellules, il y a un niveau supplémentaire avec le type de cellules (SK ou MDA)

## Déploiement sur GitHub Pages

Pour déployer l'application sur GitHub Pages:

1. Modifiez le champ `homepage` dans `package.json` en remplaçant `username` par votre nom d'utilisateur GitHub
   ```json
   "homepage": "https://votre-username.github.io/nanoparticles-dashboard",
   ```

2. Exécutez la commande `npm run deploy`

3. Accédez à l'URL spécifiée dans le champ homepage

## Développement

Pour contribuer au projet:

1. Créez une branche pour vos modifications
2. Effectuez vos changements
3. Soumettez une pull request

## Licence

Ce projet est distribué sous licence MIT.

## Contact

Pour toute question ou suggestion concernant ce projet, n'hésitez pas à nous contacter.
