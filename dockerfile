#FROM node:22-alpine

#WORKDIR /app

#COPY package*.json ./

#RUN npm cache clean --force && npm install --legacy-peer-deps

#COPY . .

#RUN npx prisma generate

#EXPOSE 3000

#CMD ["npm", "run", "start:migrate:prod"]

#############

# Etapa de construcción
FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npx prisma generate

# Etapa de ejecución
FROM node:22-alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE 3000

CMD ["npm", "run", "start:migrate:prod"]

