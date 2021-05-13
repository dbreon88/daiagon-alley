#!/bin/bash
set -e
export PGPASSWORD=$POSTGRES_PASSWORD;
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  BEGIN;
    CREATE TABLE IF NOT EXISTS event (
	  block_number bigint NOT NULL PRIMARY KEY,
	  compound real not null,
    dsr real not null,
    aave real not null,
	  created timestamp default current_timestamp
	);
  COMMIT;
EOSQL