PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE contact_form (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO contact_form VALUES(1,'Frank','localhost.i191h@passmail.net','general','test 445','CURRENT_TIMESTAMP');
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence VALUES('contact_form',1);
COMMIT;
