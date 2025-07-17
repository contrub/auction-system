-- User triggers

CREATE FUNCTION prevent_negative_user_balance()
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.balance < 0 THEN
        RAISE EXCEPTION 'Balance cannot be negative';
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER prevent_negative_user_balance_trigger
    BEFORE INSERT OR UPDATE ON "user"
    FOR EACH ROW
EXECUTE FUNCTION prevent_negative_user_balance();

-- Lot triggers

CREATE FUNCTION prevent_negative_lot_amount()
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.amount < 0 THEN
        RAISE EXCEPTION 'Amount cannot be negative';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER prevent_negative_lot_amount_trigger
    BEFORE INSERT OR UPDATE ON "lot"
    FOR EACH ROW
EXECUTE FUNCTION prevent_negative_lot_amount();

-- Bid triggers

CREATE FUNCTION check_bid_constraints()
    RETURNS TRIGGER AS $$
DECLARE
    lot_amount DOUBLE PRECISION;
    user_balance DOUBLE PRECISION;
BEGIN
    IF NEW.amount < 0 THEN
        RAISE EXCEPTION 'Amount cannot be negative';
    END IF;

    SELECT amount INTO lot_amount FROM lot WHERE id = NEW.lot_id;
    SELECT balance INTO user_balance FROM "user" WHERE id = NEW.user_id;

    IF NEW.amount < lot_amount THEN
        RAISE EXCEPTION 'Bid amount cannot be lower than current lot amount';
    END IF;

    IF user_balance < NEW.amount THEN
        RAISE EXCEPTION 'User balance is lower than the bid amount';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER check_bid_constraints_trigger
    BEFORE INSERT OR UPDATE ON bid
    FOR EACH ROW
EXECUTE FUNCTION check_bid_constraints();

-- Payment trigger

CREATE FUNCTION prevent_negative_payment_amount()
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.amount < 0 THEN
        RAISE EXCEPTION 'Amount cannot be negative';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER prevent_negative_payment_amount_trigger
    BEFORE INSERT OR UPDATE ON "payment"
    FOR EACH ROW
EXECUTE FUNCTION prevent_negative_payment_amount();

-- Auction triggers

CREATE FUNCTION check_auction_dates_insert()
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.start_date < CURRENT_DATE THEN
        RAISE EXCEPTION 'Start date cannot be earlier than today';
    END IF;
    IF NEW.end_date IS NOT NULL AND NEW.end_date <= NEW.start_date THEN
        RAISE EXCEPTION 'End date must be later than start date';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER check_auction_dates_before_insert
    BEFORE INSERT ON "auction"
    FOR EACH ROW
EXECUTE FUNCTION check_auction_dates_insert();

CREATE FUNCTION check_auction_dates_update()
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.start_date <> OLD.start_date THEN
        RAISE EXCEPTION 'Start date cannot be updated';
    END IF;
    IF NEW.end_date IS NOT NULL AND NEW.end_date <= NEW.start_date THEN
        RAISE EXCEPTION 'End date must be later than start date';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER check_auction_dates_before_update
    BEFORE UPDATE ON "auction"
    FOR EACH ROW
EXECUTE FUNCTION check_auction_dates_update();
