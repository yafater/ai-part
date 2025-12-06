# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# ---------- Stage 2 ----------
FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install 

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 5000

CMD ["node", "dist/main"]
