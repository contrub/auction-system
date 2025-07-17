CREATE OR REPLACE FUNCTION get_user_roles(p_username character varying)
RETURNS TABLE(role_name text) AS $$
BEGIN
    RETURN QUERY
    SELECT r.rolname AS role_name
    FROM pg_roles r
    JOIN pg_auth_members m ON r.oid = m.roleid
    JOIN pg_roles u ON u.oid = m.member
    WHERE u.rolname = p_username;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_bids_by_lot_id(p_lot_id INTEGER)
    RETURNS TABLE (
        id INTEGER,
        username VARCHAR,
        user_id INTEGER,
        lot_title VARCHAR,
        lot_id INTEGER,
        amount DOUBLE PRECISION,
        bid_date TIMESTAMP
    ) AS $$
BEGIN
    RETURN QUERY
    SELECT
        bid.id AS id,
        u.username,
        bid.user_id AS user_id,
        l.title AS lot_title,
        bid.lot_id as lot_id,
        bid.amount,
        bid.bid_date
    FROM bid
        JOIN "user" u ON bid.user_id = u.id
        JOIN "lot" l ON bid.lot_id = l.id
    WHERE bid.lot_id = p_lot_id;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION get_proposals_by_lot_id(p_lot_id INTEGER)
    RETURNS TABLE (
        id INTEGER,
        lot_id INTEGER,
        user_id INTEGER,
        description VARCHAR(255)
    ) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.lot_id,
        p.user_id,
        p.description
    FROM "proposal" p
    WHERE p.lot_id = p_lot_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION determine_winner(p_lot_id INTEGER)
RETURNS TABLE (
    id INTEGER,
    lot_id INTEGER,
    user_id INTEGER,
    amount DOUBLE PRECISION
) AS
$$
DECLARE
    highest_bid RECORD;
    payment_exists BOOLEAN;
    auction_end_date TIMESTAMP;
    v_payment_id INTEGER;
    v_lot_id INTEGER;
    v_user_id INTEGER;
    v_amount DOUBLE PRECISION;
BEGIN
    -- Проверяем, завершился ли аукцион
    SELECT a.end_date
    INTO auction_end_date
    FROM "auction" a
    JOIN "lot" l ON a.id = l.auction_id
    WHERE l.id = p_lot_id;

    IF auction_end_date > CURRENT_TIMESTAMP THEN
        RAISE EXCEPTION 'Auction is still ongoing';
    END IF;

    -- Проверяем, существует ли уже платеж
    SELECT EXISTS(
        SELECT 1
        FROM payment p
        WHERE p.lot_id = p_lot_id
    ) INTO payment_exists;

    IF payment_exists THEN
        RETURN QUERY
        SELECT
            p.id,
            p.lot_id,
            p.user_id,
            p.amount
        FROM payment p
        WHERE p.lot_id = p_lot_id;
    ELSE
        -- Находим победную ставку
        SELECT DISTINCT ON (b.lot_id)
            b.lot_id,
            b.user_id,
            b.amount
        INTO highest_bid
        FROM bid b
        WHERE b.lot_id = p_lot_id
        ORDER BY b.lot_id, b.amount DESC, b.bid_date ASC;

        IF highest_bid.lot_id IS NOT NULL THEN
            -- Вставляем платёж
            INSERT INTO payment (lot_id, user_id, amount)
            VALUES (highest_bid.lot_id, highest_bid.user_id, highest_bid.amount)
            RETURNING id, lot_id, user_id, amount
            INTO v_payment_id, v_lot_id, v_user_id, v_amount;

            RETURN QUERY
            SELECT v_payment_id, v_lot_id, v_user_id, v_amount;
        END IF;
    END IF;
END;
$$ LANGUAGE plpgsql;
