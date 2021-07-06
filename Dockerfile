FROM node:15

WORKDIR /app
COPY ./package.json ./

RUN npm install
COPY ./ /app

RUN npx tsc
ENV PORT=8080

EXPOSE 8080
# run nginx
CMD [ "node", "dist/app.js" ]
