FROM ???

# port à exposer pour accéder à l'application
???

# on installe les outils nécessaire à la construction et à l'exécution
???

# on se place dans un dossier de travail et on y copie tout le code de l'application
???
???

# On construit l'application et on la déplace dans le bon dossier pour nginx
RUN ???
RUN cp -r ??? /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
