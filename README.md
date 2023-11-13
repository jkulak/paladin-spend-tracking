## Run locally

1. Create Docker network: `docker network create paladin_network`
1. Run Postgres container: `docker run -d --network paladin_network --env-file .env --name paladindb -v $(pwd)/pg_data:/pgdata -v $(pwd)/pg_backup:/pg_backup postgres:15.4-alpine3.18`
1. Run Adminer container: `docker run -d --network paladin_network --env-file .env -p 8080:8080 --name paladin-adminer adminer:latest`
1. Run postgrest (API) container: `docker run -d --network paladin_network --env-file .env -p 3000:3000 --name paladin-postgrest postgrest/postgrest:v11.2.0`

Then open 

1. Postgrest: http://localhost:3000/transactions and http://localhost:3000/transaction_view and http://localhost:3000/transactions_view_materialized
1. Adminer: http://localhost:8080/?pgsql=paladin-db&username=postgres&db=paladin&ns=public

## www

1. Code is in `www` folder
1. Build the container: `docker build -t paladin/www .` from the `www` folder
1. Run the container in the dev mode (mounted code from host): `docker run --rm -ti -v $(pwd)/www/app:/app -p 3001:3001 --env PORT=3001 --name paladin-www paladin/www sh --login`
1. On first run install dependencies: `yarn` (they are installed in the container, but you are overwriting the dev directory with local code)
1. Run the app: `yarn start`

## Import data

* Open code in devcontainer
* In `main.py` update the `CSV_DATA_FILE` with newest value
* In terminal, run: `python src/main.pl`

This will import the data from CSV file into the database.

## Work with Alembic

```sh
alembic -c db/alembic.ini revision --autogenerate -m "Migration description"
```

```sh
alembic -c db/alembic.ini upgrade head
```

```sh
alembic -c db/alembic.ini downgrade -1
```

### Init Alembic

1. Make sure that `alembic_version` table is empty (it saves the current revision)
1. `alembic -c db/alembic.ini revision --autogenerate -m "Initial migration"`
