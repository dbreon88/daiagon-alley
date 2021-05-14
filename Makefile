CONTAINER_PG := $(shell docker-compose ps -q db)

run:
	docker compose up -d
build:
	docker compose build
dev:
	docker compose up
stop:
	docker compose down
migrate: #sometime fails on first run, neet to run again
	docker compose up db -d 
	docker exec -it ${CONTAINER_PG} /dbInit/01-init.sh  # make sure table for rates exists
	docker compose up #start up the rest of the services