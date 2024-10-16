-- Create Script for KAL American Dream Database
-- Luke Doherty
-- Kieran Sullivan
-- Alex Tassiopoulos

-- -----------------------------------------------------
-- Schema americanDream
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS americanDream;

-- -----------------------------------------------------
-- Table americanDream.User
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDream."User" (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR(45),
  email VARCHAR(45),
  phone VARCHAR(45),
  role VARCHAR(45),
  password VARCHAR(45),
  hasVoted BOOLEAN
);

-- -----------------------------------------------------
-- Table americanDream.Initiative
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDream."Initiative" (
  initiative_id SERIAL,
  election_id INT NOT NULL,
  initName VARCHAR(45),
  subtitle VARCHAR(45),
  description TEXT,
  imagePath VARCHAR(45),
  initVotesAllowed INT,
  positiveVotes INT,
  negativeVotes INT,
  neutralVotes INT,
  PRIMARY KEY (initiative_id, election_id)
);

-- -----------------------------------------------------
-- Table americanDream.Candidate
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDream."Candidate" (
  candidate_id SERIAL,
  office_id INT NOT NULL,
  candidateName VARCHAR(45),
  subtitle VARCHAR(45),
  description TEXT,
  imagePath VARCHAR(45),
  positiveVotes INT,
  PRIMARY KEY (candidate_id, office_id)
);

-- -----------------------------------------------------
-- Table americanDream.Office
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDream."Office" (
  office_id SERIAL,
  election_id INT NOT NULL,
  officeName VARCHAR(45),
  officeVotesAllowed INT,
  PRIMARY KEY (office_id, election_id),
  CONSTRAINT Office_Candidate_fk
    FOREIGN KEY (office_id)
    REFERENCES americanDream."Candidate" (office_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table americanDream.Election
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDream."Election" (
  election_id SERIAL,
  society_id INT NOT NULL,
  name VARCHAR(45),
  totalVotes INT,
  ballotCount INT,
  activity BOOLEAN,
  startsAt DATE,
  endsAt DATE,
  PRIMARY KEY (election_id, society_id),
  CONSTRAINT Election_Initiative_fk
    FOREIGN KEY (election_id)
    REFERENCES americanDream."Initiative" (election_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT Election_Office_fk
    FOREIGN KEY (election_id)
    REFERENCES americanDream."Office" (election_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table americanDream.Society
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDream."Society" (
  society_id SERIAL PRIMARY KEY,
  name VARCHAR(45),
  memberCount INT,
  avgVote DOUBLE PRECISION,
  CONSTRAINT Society_Election_fk
    FOREIGN KEY (society_id)
    REFERENCES americanDream."Election" (society_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table americanDream.Assignment
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDream."Assignment" (
  user_id INT NOT NULL,
  society_id INT NOT NULL,
  PRIMARY KEY (user_id, society_id),
  CONSTRAINT Assignment_User_fk
    FOREIGN KEY (user_id)
    REFERENCES americanDream."User" (user_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT Assignment_Society_fk
    FOREIGN KEY (society_id)
    REFERENCES americanDream."Society" (society_id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
);

-- -----------------------------------------------------
-- Table americanDream.System
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS americanDream."System" (
  queryTime INT,
  httpTime INT
);

-- -----------------------------------------------------
-- Insert Test Users 1, 2, 3, 4
-- -----------------------------------------------------
INSERT INTO americanDream."User" (user_id, name, email, phone, role, password, hasVoted) VALUES
(1, 'test1', NULL, NULL, 'member', '!testPass1', NULL),
(2, 'test2', NULL, NULL, 'officer', '!testPass2', NULL),
(3, 'test3', NULL, NULL, 'employee', '!testPass3', NULL),
(4, 'test4', NULL, NULL, 'administrator', '!testPass4', NULL);