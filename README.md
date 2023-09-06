## Run locally

1. Create Docker network: `docker network create paladin_network`
1. Run Postgres container: `docker run -d --network paladin_network --env-file .env --name paladindb -v $(pwd)/pg_data:/pgdata -v $(pwd)/pg_backup:/pg_backup postgres:15.4-alpine3.18`
1. Run Adminer container: `docker run -d --network paladin_network --env-file .env -p 8080:8080 --name paladin-adminer adminer:latest`

## Work with Alembic

`alembic -c db/alembic.ini upgrade head`
`alembic -c db/alembic.ini downgrade -1`

### Init Alembic

1. Make sure that `alembic_version` table is empty (it saves the current revision)
1. `alembic -c db/alembic.ini revision --autogenerate -m "Initial migration"`