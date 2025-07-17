CREATE PROCEDURE register_user(
    IN p_username VARCHAR(30),
    IN p_first_name VARCHAR(50),
    IN p_last_name VARCHAR(50),
    IN p_password VARCHAR(50),
    IN p_role VARCHAR(50)
) LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO "user" (
        username,
        first_name,
        last_name,
        balance
    ) VALUES (
        p_username,
        p_first_name,
        p_last_name,
        0
    );

    EXECUTE format(
        'CREATE USER %I WITH PASSWORD %L',
        p_username,
        p_password
    );

    EXECUTE format(
        'GRANT %I TO %I',
        p_role,
        p_username
    );
END;
$$;

CALL register_user('user1', 'Alice', 'Smith', 'P@ssw0rd!23', 'participant');
CALL register_user('user2', 'Bob', 'Jones', 'B0b$Strong#Pwd', 'participant');
CALL register_user('user3', 'Charlie', 'Brown', 'Ch@rlie_2024!', 'participant');
CALL register_user('recruiter1', 'Diana', 'Miller', 'D!ana#Secure89', 'recruiter');
CALL register_user('recruiter2', 'Evan', 'Clark', 'Ev@n_R3cruit#1', 'recruiter');
CALL register_user('admin1', 'Frank', 'Wright', 'Adm1n$Power!42', 'admin');
