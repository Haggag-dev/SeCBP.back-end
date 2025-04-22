FROM node:23-alpine3.20

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY tsconfig.json ./

COPY apps/orders.microservice .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]