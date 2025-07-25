run:
	docker compose -f local.yaml up -d --remove-orphans

build:
	docker compose -f local.yaml build --no-cache

down:
	docker compose -f local.yaml down

down-v:
	docker compose -f local.yaml down -v

logs:
	docker logs expense_tracker

inspect_server:
	docker exec -it expense_tracker /bin/sh
migrations:
	docker exec expense_tracker npm run migrations

run-prod:
	docker compose -f prod.yaml up -d --remove-orphans

build-prod:
	docker compose -f prod.yaml build --no-cache

copy:
	./copy-static.sh
