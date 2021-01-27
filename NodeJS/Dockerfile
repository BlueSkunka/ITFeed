FROM node:14
RUN npm install -g nodemon
WORKDIR /usr/src/api
COPY package*.json /usr/src/api/
RUN npm install 
COPY . /usr/src/api/
EXPOSE 8080
CMD ["nodemon", "api.js"]