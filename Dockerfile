FROM node:10

WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN yarn install

# RUN yarn global add serve
RUN yarn build 
# CMD node server.js

# 2nd Stage
EXPOSE 80
FROM nginx
COPY --from=0 /usr/src/app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]