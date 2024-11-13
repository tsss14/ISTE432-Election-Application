CREATE OR REPLACE FUNCTION get_user_login(
    p_username VARCHAR,
    p_password VARCHAR
)
RETURNS TABLE (
    user_id INT,
    name VARCHAR,
    phone VARCHAR,
    role VARCHAR,
    hasVoted BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        "User".user_id,
        "User".first_name,
        "User".phone,
        "User".role,
        "User"."hasVoted"
    FROM 
        americandreamdb."User"
    WHERE 
        username = p_username 
        AND password = p_password;
END;
$$ LANGUAGE plpgsql;

-- TEST DATA ENTRY 
-- Create the Society
INSERT INTO americanDreamDB."Society" ("name", "memberCount", "avgVote")
VALUES ('Test1', 0, 0.0)
RETURNING "society_id";

-- Create the Election assigned to the Society
INSERT INTO americanDreamDB."Election" ("society_id", "name", "totalVotes", "ballotCount", "activity", "startsAt", "endsAt")
VALUES (
    (SELECT "society_id" FROM americanDreamDB."Society" WHERE "name" = 'Test1'),
    'ElectionTest1', 
    0, 0, TRUE, 
    '2024-11-12', '2024-12-12'
)
RETURNING "election_id";

-- Create the Office for the Election
INSERT INTO americanDreamDB."Office" ("election_id", "officeName", "officeVotesAllowed")
VALUES (
    (SELECT "election_id" FROM americanDreamDB."Election" WHERE "name" = 'ElectionTest1'),
    'OfficeTest1', 1
)
RETURNING "office_id";

-- Create Candidates for the Office
INSERT INTO americanDreamDB."Candidate" ("office_id", "candidateName", "subtitle", "description", "imagePath", "positiveVotes")
VALUES 
(
    (SELECT "office_id" FROM americanDreamDB."Office" WHERE "officeName" = 'OfficeTest1'),
    'Cand1', 'test', 'description test', NULL, 0
),
(
    (SELECT "office_id" FROM americanDreamDB."Office" WHERE "officeName" = 'OfficeTest1'),
    'Cand2', 'test', 'description test', NULL, 0
),
(
    (SELECT "office_id" FROM americanDreamDB."Office" WHERE "officeName" = 'OfficeTest1'),
    'Cand3', 'test', 'description test', NULL, 0
);
