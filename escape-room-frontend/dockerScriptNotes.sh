

# Push to hub.docker.com
#  export DOCKER_ID_USER="username"
# docker login
# docker tag my_image $DOCKER_ID_USER/my_image
# docker push $DOCKER_ID_USER/my_image

# docker build --rm -f Dockerfile -t escape-room-frontend:latest .
# docker tag escape-room-frontend:latest ndegroff/escape-room-frontend:1.0.0
# docker tag escape-room-frontend:latest ndegroff/escape-room-frontend:latest
# docker run -d --rm --name my_escape_room -p 80:80 escape-room-frontend:latest
# docker inspect --format="{{.Id}}" b1a0ee3a8ab4
# docker push ndegroff/escape-room-frontend

docker cp --follow-link f49605686a02:/etc/nginx/nginx.conf e:/temp/hold
docker cp --follow-link 0615f0e614a3:/etc/nginx/nginx.conf e:/temp/hold


# docker build --rm -f Dockerfile -t escape-room-backend:latest .
# docker tag escape-room-backend:latest ndegroff/escape-room-backend:1.0.0
# docker tag escape-room-backend:latest ndegroff/escape-room-backend:latest
# docker run -d --rm --name my_escape_room_be -p 8080:8080 escape-room-backend:latest
# docker inspect --format="{{.Id}}" b1a0ee3a8ab4
# docker push ndegroff/escape-room-backend

curl -i http://localhost:8080/api/game/status
curl -i http://escape-room-back:8080/api/game/status


curl -i http://localhost:80/api/api/game/status

curl -i http://localhost/api/game/status


curl -i http://localhost:80/api/api/game/status

docker-compose -f ./docker-compose.yml up -d

docker-compose -f ./docker-compose.local.yml up -d

# docker image ls | grep escape-room
# docker tag cfef16f032a9 ndegroff/escape-room-frontend:0.1.0
# docker tag cfef16f032a9 ndegroff/escape-room-frontend:latest
# docker tag edf7c427e4a9 ndegroff/escape-room-backend:0.1.0
# docker tag edf7c427e4a9 ndegroff/escape-room-backend:latest
# docker login 
# docker login --username=ndegroff --email=youremail@company.com
# docker push ndegroff/escape-room-frontend
# docker push ndegroff/escape-room-backend

