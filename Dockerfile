FROM node:12.18.3

ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

COPY yarn.lock .

RUN yarn install 

COPY . .

CMD ["yarn", "run", "dev"]

