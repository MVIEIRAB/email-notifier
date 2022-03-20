FROM node:16
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn install
RUN yarn build

COPY dist .
EXPOSE 3000
CMD ["yarn", "start:prod"]
