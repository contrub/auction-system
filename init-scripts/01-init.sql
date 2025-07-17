CREATE TABLE "user"
(
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    balance DOUBLE PRECISION DEFAULT 0
);

CREATE TABLE "auction"
(
    id SERIAL NOT NULL PRIMARY KEY,
    admin_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP WITH TIME ZONE,
    FOREIGN KEY (admin_id) REFERENCES "user" (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "category"
(
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(100)
);

CREATE TABLE "lot"
(
    id SERIAL NOT NULL PRIMARY KEY,
    auction_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    amount DOUBLE PRECISION DEFAULT 0,
    title VARCHAR(100) NOT NULL,
    description VARCHAR(255),
    FOREIGN KEY (auction_id) REFERENCES "auction" (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (category_id) REFERENCES "category" (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "proposal"
(
    id SERIAL NOT NULL PRIMARY KEY,
    lot_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    description VARCHAR(255) NOT NULL,
    FOREIGN KEY (lot_id) REFERENCES "lot" (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "bid"
(
    id SERIAL NOT NULL PRIMARY KEY,
    lot_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    bid_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lot_id) REFERENCES "lot" (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE "payment"
(
    id SERIAL NOT NULL PRIMARY KEY,
    lot_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    amount DOUBLE PRECISION NOT NULL,
    FOREIGN KEY (lot_id) REFERENCES "lot" (id) ON DELETE RESTRICT ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE ROLE "admin";
CREATE ROLE "recruiter";
CREATE ROLE "participant";

GRANT CONNECT ON DATABASE "auction-system" TO "participant", "recruiter", "admin";
GRANT USAGE ON SCHEMA public to "participant", "recruiter", "admin";

-- broken GRANTs for roles

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin, recruiter, participant;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin, recruiter, participant;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO admin, recruiter, participant;

-- GRANT INSERT ON TABLE "proposal" TO participant;
-- GRANT SELECT ON TABLE "category" TO participant;
-- GRANT SELECT ON TABLE "lot" TO participant;
-- GRANT INSERT ON TABLE "bid" TO participant;
-- GRANT SELECT ON TABLE "auction" TO participant;

-- GRANT SELECT, INSERT ON TABLE "proposal" TO "recruiter";
-- GRANT SELECT ON TABLE "category" TO "recruiter";
-- GRANT SELECT, INSERT, UPDATE ON TABLE "lot" TO "recruiter";
-- GRANT INSERT ON TABLE "bid" TO "recruiter";
-- GRANT SELECT ON TABLE "auction" TO "recruiter";

-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "admin";
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "admin";
-- GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO "admin";

-- GRANT EXECUTE ON FUNCTION get_lots_by_auction_id(INTEGER) TO "participant", "recruiter", "admin";
-- GRANT EXECUTE ON FUNCTION get_bids_by_lot_id(INTEGER) TO "recruiter", "admin";
-- GRANT EXECUTE ON FUNCTION get_proposals_by_lot_id(INTEGER) TO "recruiter", "admin";
-- GRANT EXECUTE ON FUNCTION determine_winner(INTEGER) TO "admin";
