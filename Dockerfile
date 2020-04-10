FROM node:10

WORKDIR /app
COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 3000

ENV NODE_ENV=local

CMD [ "npm", "start" ]
