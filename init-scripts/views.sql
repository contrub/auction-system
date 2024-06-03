CREATE OR REPLACE VIEW user_analytics AS
SELECT
    u.id AS user_id,
    u.username,
    u.first_name,
    u.last_name,
    u.balance,
    COALESCE(bid.total_bids, 0) AS total_bids,
    COALESCE(payment.total_payments, 0) AS total_payments,
    COALESCE(auction_count.auctions_created, 0) AS auctions_created
FROM
    "user" u
LEFT JOIN
    (SELECT user_id, SUM(amount) AS total_bids FROM "bid" GROUP BY user_id) bid
ON
    u.id = bid.user_id
LEFT JOIN
    (SELECT user_id, SUM(amount) AS total_payments FROM "payment" GROUP BY user_id) payment
ON
    u.id = payment.user_id
LEFT JOIN
    (SELECT admin_id, COUNT(*) AS auctions_created FROM "auction" GROUP BY admin_id) auction_count
ON
    u.id = auction_count.admin_id;