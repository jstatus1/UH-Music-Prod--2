/* https://www.postgresqltutorial.com/creating-first-trigger-postgresql/ */
/*https://stackoverflow.com/questions/33829423/insert-execute-format-postgresql-string*/
/* https://stackoverflow.com/questions/38216533/postgres-sql-trigger-with-dynamic-column-name */


/*
   Summary: This is a trigger that fills up the notification
   table based on if the musician releaes a new track
*/
CREATE OR REPLACE FUNCTION new_album_notification()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$ 
DECLARE
	followers_table CURSOR FOR
			--get the musicians followers and send them a notificaiton
			SELECT * FROM follows
			LEFT JOIN settings 
			ON follows.follower_id = settings.user_id
			WHERE follows.user_id=NEW.user_id and 
			settings.new_album_notification = true;
BEGIN
	-- create a table to grab the senders follwers where new album notification is true
	-- loop through each row of the table and grab the user_id from the followers table 
			-- this should be the reciever _id
	FOR current_row IN followers_table LOOP
		EXECUTE format('INSERT INTO notifications
		(
			receiver_id,
			sender_id,
			album_id,
			notif_type,
			notif_text
		)
		VALUES( $1,$2,$3,$4,$5)') 
			using 
				current_row.follower_id, 
				NEW.user_id, 
				NEW.album_id, 
			    'NEWALBUM', 
				'A musician you follow has released a new album!';
	END LOOP;
RETURN NULL;
END;
$$

-------------------------------------------------------------------------

CREATE TRIGGER new_album_trigger
AFTER INSERT ON albums
FOR EACH ROW
EXECUTE PROCEDURE new_album_notification()

CREATE TRIGGER new_song_trigger
AFTER INSERT ON songs
FOR EACH ROW
EXECUTE PROCEDURE new_music_function()

-------------------------------------------------------------------------



/*
   Summary: This is a trigger that fills up the notification
   table based on if a new follower follows a user
*/
CREATE OR REPLACE FUNCTION new_follower_notification()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
DECLARE
	users_settings_table CURSOR FOR
			SELECT * FROM users
			LEFT JOIN settings 
			ON users.uid = settings.user_id
			WHERE users.uid=NEW.user_id and 
			settings.new_follower_notification = true;

			
BEGIN
	-- find a way to seperate settings from followers,
	--update previous query and this trigger query
	FOR current_row IN users_settings_table LOOP
		EXECUTE format('INSERT INTO notifications
		(
			receiver_id,
			sender_id,
			notif_type,
			notif_text
		)
		VALUES( $1,$2,$3,$4)') 
			using 
				current_row.uid, 
				NEW.follower_id,  
			    'NEWFOLLOWER', 
				'A new user has followed you!';
	END LOOP;
RETURN NULL;
END;

-------------------------------------------------------------------------

CREATE TRIGGER new_follower_trigger
AFTER INSERT ON follows
FOR EACH ROW
EXECUTE PROCEDURE new_follower_notification()

-------------------------------------------------------------------------


-------------------------------------------------------------------------

CREATE TRIGGER new_album_trigger
AFTER INSERT ON albums
FOR EACH ROW
EXECUTE PROCEDURE new_album_notification()

-------------------------------------------------------------------------



/*
   Summary: This is a trigger that notifies the user that someone has one of his followers
   has ditched him/her/they/E.T./GOD
*/
CREATE OR REPLACE FUNCTION unfollowed_notification()
RETURNS TRIGGER
LANGUAGE PLPGSQL
AS $$
DECLARE
	users_settings_table CURSOR FOR
			SELECT * FROM users
			LEFT JOIN settings 
			ON users.uid = settings.user_id
			WHERE users.uid=OLD.user_id and 
			settings.new_follower_notification = true;

			
BEGIN
	-- find a way to seperate settings from followers,
	--update previous query and this trigger query
	FOR current_row IN users_settings_table LOOP
		EXECUTE format('INSERT INTO notifications
		(
			receiver_id,
			sender_id,
			notif_type,
			notif_text
		)
		VALUES( $1,$2,$3,$4)') 
			using 
				current_row.uid, 
				OLD.follower_id,  
			    'UNFOLLOWED', 
				'Someone unfollowed You!';
	END LOOP;
RETURN NULL;
END;
$$

-------------------------------------------------------------------------

CREATE TRIGGER unfollowed_notification_trigger
AFTER DELETE ON follows
FOR EACH ROW
EXECUTE PROCEDURE unfollowed_notification();

------------------------------------------------------------------------