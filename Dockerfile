FROM node:16

WORKDIR /src

COPY package*.json ./

RUN npm ci --only=production

COPY . .

ENV NODE_ENV production

EXPOSE 80

CMD [ "node", "index.js" ]