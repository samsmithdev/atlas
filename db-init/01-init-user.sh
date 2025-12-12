#!/bin/bash
set -e

# This script runs only if the data directory is empty.
# It uses the variables we passed in docker-compose.yml

echo "Creating database: $APP_DB"
echo "Creating user: $APP_USER"

# We log into psql as the root user, then execute the SQL commands
psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    
    -- Create the user (role) with the password from the environment variable
    CREATE USER "$APP_USER" WITH PASSWORD '$APP_PASSWORD';

    -- Create the database and assign ownership to that user
    CREATE DATABASE "$APP_DB" OWNER "$APP_USER";

    -- Grant privileges (basic setup for a dedicated app user)
    GRANT ALL PRIVILEGES ON DATABASE "$APP_DB" TO "$APP_USER";

    -- Optional: If using specific schemas later, you might grant schema usage here
EOSQL

echo "Jarvis database initialization complete."