CREATE OR REPLACE FUNCTION get_user_login(
    p_username VARCHAR,
    p_password VARCHAR
)
RETURNS TABLE (
    user_id INT,
    name VARCHAR,
    email VARCHAR,
    phone VARCHAR,
    role VARCHAR,
    hasVoted BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        user_id,
        name,
        email,
        phone,
        role,
        hasVoted
    FROM 
        americanDream."User"
    WHERE 
        username = p_username 
        AND password = p_password;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION add_user(
    u_id INT,
    fname VARCHAR,
    lname VARCHAR,
    uname VARCHAR,
    s_id INT,
    u_role VARCHAR
)
START 
    INSERT INTO americanDreamDB."User"
        (user_id, first_name, last_name, username, society_id, role)
    VALUES
        (u_id, fname, lname, uname, s_id, u_role);
END