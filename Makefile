
CONTAINER_PG := $(shell docker-compose ps -q db)

run: build
	docker compose up -d
build:
	docker compose build
dev: build
	docker compose up
clean:
	docker compose down
migrate:
	docker exec -it ${CONTAINER_PG} /dbInit/01-init.sh