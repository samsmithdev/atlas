#!/bin/bash
set -e

# Log info
echo "--- STARTING JARVIS DB INITIALIZATION ---"

# 1. Create the App User (No Superuser needed!)
# We use the env vars you passed in Unraid
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE USER "$APP_USER" WITH PASSWORD '$APP_PASSWORD';
    CREATE DATABASE "$APP_DB" OWNER "$APP_USER";
    GRANT ALL PRIVILEGES ON DATABASE "$APP_DB" TO "$APP_USER";
EOSQL

# 2. Install the Vector Extension AS ROOT
# We connect to the NEW database as the ROOT user to install the extension.
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$APP_DB" <<-EOSQL
    CREATE EXTENSION IF NOT EXISTS vector;
    
    -- Grant permission for the app user to use the schema if needed
    GRANT ALL ON SCHEMA public TO "$APP_USER";
EOSQL

echo "--- JARVIS DB INITIALIZATION COMPLETE ---"