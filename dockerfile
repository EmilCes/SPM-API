FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm cache clean --force && npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:migrate:prod"]
