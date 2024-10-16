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