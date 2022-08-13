CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS api_users(
  id uuid DEFAULT uuid_generate_v4(),
  username VARCHAR  NOT NULL,
  password VARCHAR NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO api_users (username, password) VALUES ('fesousadev', crypt('123456', 'my_salt'));
