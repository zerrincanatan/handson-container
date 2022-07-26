FROM node:18-alpine
WORKDIR /app

COPY server.js package.json ./
RUN npm install

CMD ["node", "server.js"]
