## Run locally

1. Create Docker network: `docker network create paladin_network`
1. Run Postgres container: `docker run -d --network paladin_network --env-file .env --name paladindb -v $(pwd)/pg_data:/pgdata -v $(pwd)/pg_backup:/pg_backup postgres:15.4-alpine3.18`
1. Run Adminer container: `docker run -d --network paladin_network --env-file .env -p 8080:8080 --name paladin-adminer adminer:latest`
1. Run postgrest container: `docker run -d --network paladin_network --env-file .env -p 3000:3000 --name paladin-postgrest postgrest/postgrest:v11.2.0`

Then open 

1. Postgrest: http://localhost:3000/transactions
1. Adminer: http://localhost:8080/?pgsql=paladin-db&username=postgres&db=paladin&ns=public

## Work with Alembic

`alembic -c db/alembic.ini upgrade head`
`alembic -c db/alembic.ini downgrade -1`

### Init Alembic

1. Make sure that `alembic_version` table is empty (it saves the current revision)
1. `alembic -c db/alembic.ini revision --autogenerate -m "Initial migration"`