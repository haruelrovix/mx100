--
-- File generated with SQLiteStudio v3.1.1 on Thu Jun 28 13:20:31 2018
--
-- Text encoding used: System
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: freelancer_rank
CREATE TABLE freelancer_rank (id INTEGER PRIMARY KEY AUTOINCREMENT, user_account_id REFERENCES user_account (id), rank_id CHAR REFERENCES rank (id));
INSERT INTO freelancer_rank (id, user_account_id, rank_id) VALUES (1, 4, 'B');
INSERT INTO freelancer_rank (id, user_account_id, rank_id) VALUES (2, 1, 'A');

-- Table: job_post
CREATE TABLE job_post (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR (50) NOT NULL, description VARCHAR (250) NOT NULL, job_post_status_id INTEGER REFERENCES job_post_status (id));
INSERT INTO job_post (id, title, description, job_post_status_id) VALUES (1, 'Fullstack Digital Wallet', 'One app (hybrid) to connect people to make business. \nTech: Angular or React Native + MongoDB + NodeJS', 2);
INSERT INTO job_post (id, title, description, job_post_status_id) VALUES (2, 'Unity3D Integration', 'This is long-term position and I would like to hire the developer who has extensive experience in gaming development.', 1);
INSERT INTO job_post (id, title, description, job_post_status_id) VALUES (3, 'Geo-based Traffic project', 'Media4u implements innovative IT and multimedia projects for its own marketing.', 3);
INSERT INTO job_post (id, title, description, job_post_status_id) VALUES (4, 'SaaS application', 'This is a SaaS application that provide business owner the capabilities to send design documents.', 2);

-- Table: job_post_status
CREATE TABLE job_post_status (id INTEGER PRIMARY KEY AUTOINCREMENT, description VARCHAR (20) NOT NULL);
INSERT INTO job_post_status (id, description) VALUES (1, 'Draft');
INSERT INTO job_post_status (id, description) VALUES (2, 'Published');
INSERT INTO job_post_status (id, description) VALUES (3, 'Inactive');

-- Table: proposal
CREATE TABLE proposal (id INTEGER PRIMARY KEY AUTOINCREMENT, user_account_id INTEGER REFERENCES user_account (id), job_post_id INTEGER REFERENCES job_post (id), message VARCHAR, apply_date DATE NOT NULL, proposal_status_id INTEGER REFERENCES proposal_status (id));
INSERT INTO proposal (id, user_account_id, job_post_id, message, apply_date, proposal_status_id) VALUES (1, 4, 2, 'Hi There, Please accept my proposal. Thanks.', '2018-06-28 04:00:23.000 +00:00', 1);

-- Table: proposal_status
CREATE TABLE proposal_status (id INTEGER PRIMARY KEY, status VARCHAR (10) NOT NULL);
INSERT INTO proposal_status (id, status) VALUES (1, 'Submitted');
INSERT INTO proposal_status (id, status) VALUES (2, 'Declined');

-- Table: rank
CREATE TABLE rank (id CHAR PRIMARY KEY, proposal_space INT NOT NULL);
INSERT INTO rank (id, proposal_space) VALUES ('B', 20);
INSERT INTO rank (id, proposal_space) VALUES ('A', 40);

-- Table: user_account
CREATE TABLE user_account (id INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR (255) NOT NULL, password VARCHAR (100) NOT NULL, user_type_id INTEGER REFERENCES user_type (id));
INSERT INTO user_account (id, email, password, user_type_id) VALUES (1, 'surat@havit.web.id', 'b63c5d259ee17b7948c2ca0d9688b75e4279853c', 3);
INSERT INTO user_account (id, email, password, user_type_id) VALUES (2, 'career@ajobthing.my', 'b63c5d259ee17b7948c2ca0d9688b75e4279853c', 2);
INSERT INTO user_account (id, email, password, user_type_id) VALUES (3, 'admin@ajobthing.my', 'b63c5d259ee17b7948c2ca0d9688b75e4279853c', 1);
INSERT INTO user_account (id, email, password, user_type_id) VALUES (4, 'cahcologykidz@yahoo.com', 'b63c5d259ee17b7948c2ca0d9688b75e4279853c', 3);

-- Table: user_type
CREATE TABLE user_type (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR (30) NOT NULL);
INSERT INTO user_type (id, name) VALUES (1, 'Administrator');
INSERT INTO user_type (id, name) VALUES (2, 'Employer');
INSERT INTO user_type (id, name) VALUES (3, 'Freelancer');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
