FROM node:latest

WORKDIR /app/api-rest

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "start" ]
