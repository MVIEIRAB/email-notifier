FROM node:14-alpine as builder
WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn build

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app/dist /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY .env /app/
RUN yarn install --production=true
CMD node src/main.js
