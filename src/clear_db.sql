-- Delete data from junction tables or tables with foreign keys referencing other tables
DELETE FROM transaction_labels;

-- Delete data from tables with foreign keys
DELETE FROM transactions;
DELETE FROM account;
DELETE FROM category;
DELETE FROM label;
DELETE FROM payee;
DELETE FROM alembic_version;

-- Reset the sequences
ALTER SEQUENCE account_id_seq RESTART WITH 1;
ALTER SEQUENCE category_id_seq RESTART WITH 1;
ALTER SEQUENCE label_id_seq RESTART WITH 1;
ALTER SEQUENCE payee_id_seq RESTART WITH 1;
ALTER SEQUENCE transactions_id_seq RESTART WITH 1;
