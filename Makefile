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
