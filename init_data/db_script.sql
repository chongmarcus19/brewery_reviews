DROP TABLE IF EXISTS brewery CASCADE;
CREATE TABLE IF NOT EXISTS brewery (
    id SERIAL PRIMARY KEY,
    brewery_name VARCHAR(30),
    review VARCHAR(255),
    review_date VARCHAR(50)
);