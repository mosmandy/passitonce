FROM node:18.12.1-alpine
COPY package.json /app/
COPY package-lock.json /app/
COPY server.js /app/
COPY models /app/models
COPY README.md /app/
COPY .env /app/
EXPOSE 3000
WORKDIR /app
RUN npm install

CMD ["node","server.js"]
