-- User triggers

CREATE OR REPLACE FUNCTION prevent_negative_balance()
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.balance < 0 THEN
        RAISE EXCEPTION 'Balance cannot be negative';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_negative_balance_trigger
    BEFORE INSERT OR UPDATE ON "user"
    FOR EACH ROW
    EXECUTE FUNCTION prevent_negative_balance();

-- Message triggers

CREATE OR REPLACE FUNCTION prevent_self_messaging()
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.user_from = NEW.user_to THEN
        RAISE EXCEPTION 'Cannot send message to yourself';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_self_messaging_trigger
    BEFORE INSERT OR UPDATE ON "message"
    FOR EACH ROW
EXECUTE FUNCTION prevent_self_messaging();

-- Payment triggers

CREATE OR REPLACE FUNCTION prevent_negative_amount()
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.amount < 0 THEN
        RAISE EXCEPTION 'Amount cannot be negative';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_negative_amount_trigger
    BEFORE INSERT OR UPDATE ON "payment"
    FOR EACH ROW
EXECUTE FUNCTION prevent_negative_amount();

-- Bid triggers

CREATE OR REPLACE FUNCTION prevent_negative_bid()
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.amount < 0 THEN
        RAISE EXCEPTION 'Amount cannot be negative';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_negative_bid
    BEFORE INSERT OR UPDATE ON "bid"
    FOR EACH ROW
EXECUTE FUNCTION prevent_negative_bid();

-- Auction triggers

CREATE OR REPLACE FUNCTION check_dates()
    RETURNS TRIGGER AS $$
BEGIN
    IF NEW.end_date < NEW.start_date THEN
        RAISE EXCEPTION 'End date cannot be earlier than start date';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_dates
    BEFORE INSERT OR UPDATE ON "auction"
    FOR EACH ROW
EXECUTE FUNCTION check_dates();