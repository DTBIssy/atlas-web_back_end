-- Resets valid_email when email is changed
CREATE TRIGGER reset_email BEFORE
UPDATE ON users FOR EACH ROW BEGIN If NEW.email <> OLD.email THEN
SET NEW.valid_email = 0;
END IF;
END;
