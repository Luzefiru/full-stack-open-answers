CREATE TABLE blogs (
  id SERIAL,
  author VARCHAR(127),
  url TEXT NOT NULL,
  title TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

INSERT INTO blogs (author, url, title)
VALUES
('Alex Mitrani', 'https://medium.com/@amitrani/getting-started-with-postgresql-5990b54f7169', 'Getting Started With PostgreSQL'),
('Umair Nadeem', 'https://medium.com/@umairnadeem/deploy-to-aws-using-docker-compose-