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
