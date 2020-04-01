INSERT INTO users (name, email, password)
VALUES ('Eva Stan', 'evast@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Louisa Van', 'navloius@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Dom Stal', 'staldomm@hotmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('New Name', 'newnewname@outlook.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Eight Name', '8name@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Yahoo Ann', 'yahooAnn@yahoo.ca', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Second Last', 'secondLast@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Last User', 'LastUser@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, postal_code)
VALUES (1, 'Speed lamp', 'description', 'thumbnail 1','cover 1', 960, 2, 2, 3, 'Canada', 'Mac Street', 'Arkham', 'Alberta', 'M9L6S6'),
(1,'Snow White', 'description', 'thumbnail 2','cover 2', 440, 0, 1, 2, 'Canada', 'WFH Street', 'Thorncliff', 'Nova Scotia', 'M1L4K5'),
(2, 'New Flash', 'description', 'thumbnail 3','cover 3', 30, 0, 1, 1, 'Canada', 'Couch Street', 'Richmond Mountain', 'Quebec', 'L9O0W9'),
(4, 'Best Room', 'description', 'thumbnail 4','cover 4', 160, 0, 2, 2, 'Canada', 'Tear Street', 'Somewhere City', 'Calgary', 'N3W4L6'),
(6, 'Boot Camp', 'description', 'thumbnail 5','cover 5', 780, 1, 1, 3, 'Canada', 'The Street', 'Hamilton', 'Ontario', 'S1X1E2'),
(6, 'Lighter', 'description', 'thumbnail 6','cover 6', 3330, 3, 4, 6, 'Canada', 'Dundas Street', 'Toronto', 'Ontario', 'S1X6I1'),
(7, 'Fun Labs', 'description', 'thumbnail 7','cover 7', 190, 0, 1, 1, 'Canada', 'King Street', 'News City', 'British Columbia', 'L0S5R6'),
(8, 'Veges', 'description', 'thumbnail 8','cover 8', 1330, 2, 3, 4, 'Canada', 'Queen Street', 'Oakville', 'Ontario', 'M9S4T6');

INSERT INTO reservations (start_date, end_date, property_id, guest_id) 
VALUES ('2018-09-11', '2018-09-26', 2, 3),
('2018-09-11', '2018-09-26', 2, 2),
('2019-01-04', '2019-02-01', 1, 4),
('2017-02-13', '2017-02-26', 3, 5),
('2018-06-11', '2018-06-13', 3, 4),
('2020-01-11', '2020-01-23', 4, 8),
('2017-11-01', '2017-11-11', 5, 1),
('2016-1-29', '2016-02-14', 6, 8),
('2019-05-11', '2019-06-16', 4, 2),
('2020-07-11', '2020-07-14', 8, 1);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES (2, 5, 10, 3, 'messages'),
(1, 4, 1, 4, 'messages'),
(8, 1, 2, 4, 'messages'),
(3, 8, 5, 4, 'messages'),
(4, 2, 7, 5, 'messages'),
(4, 3, 4, 4, 'messages'),
(5, 6, 3, 5, 'messages');