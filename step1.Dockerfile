FROM ???

# port à exposer pour accéder à l'application
EXPOSE 80

# on installe les outils nécessaire à la construction et à l'exécution
RUN apt update && apt install ???

# on se place dans un dossier de travail et on y copie tout le code de l'application
WORKDIR /app
???

# On construit l'application et on la déplace dans le bon dossier pour nginx
RUN ???
RUN cp -r ??? /var/www/html/

CMD ["nginx", "-g", "daemon off;"]
