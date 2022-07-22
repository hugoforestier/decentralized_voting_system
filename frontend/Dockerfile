FROM node:14.14.0

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

EXPOSE 3005

CMD ["npm", "start"]
