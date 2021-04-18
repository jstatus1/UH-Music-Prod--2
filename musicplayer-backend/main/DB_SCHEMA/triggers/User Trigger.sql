/*
   Summary: This is a trigger that creates the setting after the user is created
*/
CREATE OR REPLACE FUNCTION user_setting_creation_trigger()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
DECLARE
BEGIN
    EXECUTE format('INSERT INTO settings
    (
        user_id
    )
    VALUES( $1)) 
        using 
            NEW.uid;
	
RETURN NULL;
END;
$$

-------------------------------------------------------------------------

CREATE TRIGGER user_setting_creation_trigger
AFTER INSERT ON users
FOR EACH ROW
EXECUTE PROCEDURE user_setting_creation_trigger();

------------------------------------------------------------------------