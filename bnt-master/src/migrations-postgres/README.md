# PostgreSQL migrations

The generated initial baseline is separate from SQLite migrations. Validate it against the target PostgreSQL version before deployment, and plan the content/media transfer separately. It has not been applied to a live PostgreSQL server. Never run ../migrations against PostgreSQL.
