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