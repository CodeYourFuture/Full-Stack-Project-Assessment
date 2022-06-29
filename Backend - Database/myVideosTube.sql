CREATE TABLE videos (
    id  SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    url VARCHAR(100) NOT NULL,
    rating INT  
);

INSERT INTO videos (title, url, rating)
VALUES ('How websites work? | Web Development Tutorials #1','https://www.youtube.com/watch?v=6mbwJ2xhgzM&list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg', 100);
INSERT INTO videos (title, url, rating)
VALUES ('How websites work? | Web Development Tutorials #2','https://www.youtube.com/watch?v=TeZdo8mx0gc&list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg&index=2', 200);
INSERT INTO videos (title, url, rating)
VALUES ('How websites work? | Web Development Tutorials #3','https://www.youtube.com/watch?v=IA8JWGP13dI&list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg&index=3', 230);
INSERT INTO videos (title, url, rating)
VALUES ('How websites work? | Web Development Tutorials #4','https://www.youtube.com/watch?v=EZCc_4abdcE&list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg&index=4', 234);
INSERT INTO videos (title, url, rating)
VALUES ('How websites work? | Web Development Tutorials #5', 'https://www.youtube.com/watch?v=ulv_q6-b7uI&list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg&index=5', 111);
INSERT INTO videos (title, url, rating)
VALUES ('How websites work? | Web Development Tutorials #6','https://www.youtube.com/watch?v=z6H22xGAZEA&list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg&index=6',333);
INSERT INTO videos (title, url, rating)
VALUES ('How websites work? | Web Development Tutorials #7','https://www.youtube.com/watch?v=N69xumSjg5Q&list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg&index=7', 45);
INSERT INTO videos (title, url, rating)
VALUES ('How websites work? | Web Development Tutorials #8', 'https://www.youtube.com/watch?v=KqJikDzb3l4&list=PLu0W_9lII9agiCUZYRsvtGTXdxkzPyItg&index=8', 156);



