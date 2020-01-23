FROM node:8-jessie-slim
LABEL maintainer="randyramsaywack"
WORKDIR /opt/app
COPY . /opt/app/
RUN npm install
CMD ["npm", "start"]