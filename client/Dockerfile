FROM node:14-slim

WORKDIR /user/src/app

COPY ./package.json ./

RUN npm install 

COPY . .

ENV REACT_APP_BASE_URL=http://localhost:5000/api

EXPOSE 3000

CMD ["npm","start" ]
