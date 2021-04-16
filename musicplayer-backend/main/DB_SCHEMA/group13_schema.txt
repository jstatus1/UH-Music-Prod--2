/* Group 13 Music Player Schema (Assignment 2) */


CREATE TABLE musicians(
    musician_id char(15) NOT NULL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    avatar VARCHAR(100) DEFAULT '<insert image link here>',
    num_listeners INT DEFAULT 0,
    sex VARCHAR(2),
    age INT,
    register_date DATE,
    socialMedia_fb VARCHAR(200),
    socialMedia_tw VARCHAR(200),
    socialMedia_in VARCHAR(200),
    record_label VARCHAR(200),
    followers INT DEFAULT 0,
    about_me VARCHAR(300),
    username VARCHAR(30) UNIQUE,
    password VARCHAR(30),
    genre VARCHAR(20),
    created_playlists VARCHAR[] DEFAULT ARRAY[]::VARCHAR[], /* max 50 playlists */
    created_album VARCHAR[] DEFAULT ARRAY[]::VARCHAR[], /* max 100 albums?? */
    created_song VARCHAR[] DEFAULT ARRAY[]::VARCHAR[], /* max 300 albums?? */
    singles VARCHAR(50)
);

CREATE TABLE admin(
  admin_id char(15) NOT NULL PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  title VARCHAR(20),
  username VARCHAR(30),
  password VARCHAR(30),
  register_date DATE,
  avatar VARCHAR(200) DEFAULT '<insert image link here>',
  created_playlists VARCHAR[] DEFAULT ARRAY[]::VARCHAR[] /* max 50 playlists */
);

CREATE TABLE albums(
	album_Duration TIME,
	date_Published DATE,
	artists varchar(100),	
	album_ID char(20),
	num_Songs int,
	album_name varchar(60),
  songs VARCHAR[] DEFAULT ARRAY[]::VARCHAR[], /* max 50 songs */
  album_art VARCHAR(200) DEFAULT '<insert image link here>'
);


CREATE TABLE playlist(
	playlist_name varchar(100),
  creator_id char(15),
	num_songs int,
	playlist_ID CHAR(25) NOT NULL PRIMARY KEY,
  public_status CHAR(3),
  CONSTRAINT P1 CHECK(public_status in ('PRI','PUB')),
  description VARCHAR(300),
  playlist_art VARCHAR(200) DEFAULT '<insert image link here>'
);

CREATE TABLE listener(
  listener_id char(15) NOT NULL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  user_name VARCHAR(30) UNIQUE,
  password VARCHAR(30),
  register_date DATE,
  instagram VARCHAR(200),
  twitter VARCHAR(200),
  facebook VARCHAR(200),
  about_me VARCHAR(350),
  avatar VARCHAR(100) DEFAULT '<insert image link here>',
  created_playlists VARCHAR[] DEFAULT ARRAY[]::VARCHAR[] /* max 50 playlists */

);

CREATE TABLE song(
  song_title VARCHAR(40),
  song_id CHAR(30) PRIMARY KEY NOT NULL,
  musician_id VARCHAR(30),
  ft_musicians VARCHAR[] DEFAULT ARRAY[]::VARCHAR[],
  FOREIGN KEY (musician_id) REFERENCES musicians(musician_id),
  duration TIME,
  date_created DATE,
  song_art VARCHAR(200),
  num_played BIGINT
)