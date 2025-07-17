CREATE VIEW user_bids_stats AS
SELECT
    u.id AS userId,
    u.username AS username,
    COUNT(b.id) AS totalBids,
    SUM(b.amount) AS bidsSum
FROM "bid" b
    JOIN "user" u ON b.user_id = u.id
GROUP BY
    u.id,
    u.username
ORDER BY
    totalBids DESC;

CREATE VIEW lot_proposals_stats AS
SELECT
    l.id AS lotId,
    l.title AS lotTitle,
    COUNT(p.id) AS proposalsCount
FROM lot l
    LEFT JOIN proposal p ON l.id = p.lot_id
GROUP BY
    l.id,
    l.title
ORDER BY
    proposalsCount DESC;

CREATE VIEW category_stats AS
SELECT
    c.id AS categoryId,
    c.title AS categoryTitle,
    COUNT(l.id) AS usageCount
FROM category c
    LEFT JOIN lot l ON c.id = l.category_id
GROUP BY
    c.id,
    c.title
ORDER BY
    usageCount DESC;
