# Exercice 3 : Multi-stage build

## Objectif
Construire les dépendances dans une image et copier uniquement ce qu'il faut dans une autre.

## Étapes
1. Utiliser `FROM node:18-alpine` comme build stage
2. Construisez la webapp
3. Utiliser `FROM nginx:alpine` comme run stage
4. Copier le front construit en build stage
5. Lancer Nginx
