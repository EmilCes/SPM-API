FROM node:22 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN npm install -g @nestjs/cli

COPY . .
RUN npm run build

FROM node:22

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
