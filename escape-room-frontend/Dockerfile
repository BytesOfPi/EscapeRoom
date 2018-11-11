FROM nginx:1.15.5-alpine

USER root
RUN mkdir /var/www
COPY ./build /var/www
COPY nginx.conf /etc/nginx/nginx.conf

RUN apk --no-cache add curl 

EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]