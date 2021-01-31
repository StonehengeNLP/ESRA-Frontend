FROM node:10

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN yarn install

RUN ls /usr/src/app
RUN ls /usr/src/app/public

EXPOSE 3000
RUN yarn global add serve
RUN yarn build 
CMD serve -s build -l 3000