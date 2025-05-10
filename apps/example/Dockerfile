FROM node:22-alpine

WORKDIR /app

COPY . .

RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

CMD npm run start
