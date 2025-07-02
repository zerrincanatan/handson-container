FROM node:18-alpine AS builder

# on se place dans un dossier de travail et on y copie tout le code de l'application
WORKDIR /app
COPY frontend /app

# on package l'application
RUN npm install &&npm run build



FROM nginx:alpine

# port à exposer pour accéder à l'application
EXPOSE 80

# on récupère le résultat de notre conteneur de build
COPY --from=builder /app/dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
