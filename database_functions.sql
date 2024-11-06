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

