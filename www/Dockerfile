FROM node:20.9.0-alpine3.18
WORKDIR /app
COPY ./app ./
RUN yarn && \
    yarn build && \
    yarn global add serve

CMD [ "serve", "-s", "build", "-p", "3001", "--no-clipboard" ]
