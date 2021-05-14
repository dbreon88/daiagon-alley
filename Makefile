CONTAINER_PG := $(shell docker-compose ps -q db)

run:
	docker compose up -d
build:
	docker compose build
dev:
	docker compose up
stop:
	docker compose down
migrate:
	docker exec -it ${CONTAINER_PG} /dbInit/01-init.sh  # make sure table for rates exists