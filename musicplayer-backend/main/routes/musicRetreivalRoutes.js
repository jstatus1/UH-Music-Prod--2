var AWS = require('aws-sdk');
var pool = require('../db');

module.exports = app => {

    AWS.config.update({region: 'us-east-2'});
    const s3 = new AWS.S3();
    
    //S3 Delete Function
    deleteAudioFromS3 = (key) => {
        if(key== null || key == '' || key == undefined) return
        var params = {
            Bucket: 'musicplayer-song', 
            Key: key
          };
        s3.deleteObject(params, (err, data) => {
            if(err)
            {
                console.log(err)
            }
            return
        })
    }

    deleteAudioImageFromS3 = (key) => {
        if(key== null || key == '' || key == undefined) return
        var params = {
            Bucket: 'musicplayer-songart', 
            Key: key
          };
        s3.deleteObject(params, (err, data) => {
            if(err)
            {
                console.log(err)
            }
            return
        })
    }

    deleteAlbumImageFromS3 = (key) => 
    {
        if(key== null || key == '' || key == undefined) return
        var params = {
            Bucket: 'musicplayer-album-art', 
            Key: key
          };
        s3.deleteObject(params, (err, data) => {
            if(err)
            {
                console.log(err)
            }
            return
        })
    }

    deletePlaylistImageFromS3 = (key) => 
    {
        if(key== null || key == '' || key == undefined) return
        var params = {
            Bucket: 'musicplayer-playlistart', 
            Key: key
          };
        s3.deleteObject(params, (err, data) => {
            if(err)
            {
                console.log(err)
            }
            return
        })
    }


    //join songs on id and take all the column from songs and id
    
    //Tracks
    app.get('/api/get/user/tracks', (req, res) => {
        var user_id = req.user.uid
        
        pool.query(`SELECT songs.*, users.username 
        FROM songs LEFT JOIN users ON
        songs.user_id=users.uid
        WHERE songs.user_id=$1`,[user_id]).then(
            data => {
                res.send(data.rows)
            }
        ).catch(error=> {
            console.log(error)
        })
    })



    //Playlist
    app.get('/api/get/user/playlists/', (req, res) => {
        var user_id = req.user.uid
        
        

        pool.query(`select a.*, b.username 
        from playlists a 
        left join users b on a.user_id=b.uid
        WHERE a.user_id=$1`,[user_id]).then(
            data => {
                res.send(data.rows)
            }
        ).catch(error=> {
            res.status(401).send([])
            console.log(error)
        })
    })


    app.get('/api/get/playlistById', async(req, res) =>{
        var playlist_id = req.query.playlistId
        console.log(playlist_id)
        
        await pool.query(`SELECT *
                        FROM playlist_songs p
                            Left JOIN songs s
                            ON  p.song_id = s.song_id
                            Left JOIN playlists 
                            ON  p.playlist_id = playlists.playlist_id
                        WHERE p.playlist_id = $1`, [playlist_id])
                    .then((q_res) => {
                        console.log(q_res.rows)
                        res.send(q_res.rows)
                    }).catch((error) => {
                        console.log(error)
                        res.status(401).send(false)
                    })
    })

    
    app.get('/api/get/users/Albums', async(req, res)=> {
        await pool.query(`select a.*, b.username 
                            from albums a 
                            left join users b on a.user_id=b.uid
                            WHERE a.user_id=$1;`, [req.user.uid])
                    .then((q_res) => {
                        res.send(q_res.rows)
                    }).catch((error) => {
                        res.status(401).send(false)
                    })
    })


    app.get('/api/get/AlbumById', async(req, res) =>{
        var album_id = req.query.album_id
        await pool.query(`select a.*, b.*, c.username
                            from songs a 
                            left join albums b on a.album_id=b.album_id
                            left join users c on c.uid = a.user_id
                            WHERE a.album_id=$1`, [album_id])
                    .then((q_res) => {
                        res.send(q_res.rows)
                    }).catch((error) => {
                        console.log(error)
                        res.status(401).send(false)
                    })
    })


    app.get('/api/get/allSongs', async(req, res)=> {
        await pool.query(`select songs.*, users.username from songs
        left join users on songs.user_id = users.uid`)
                    .then((q_res) => {
                        res.send(q_res.rows)
                    }).catch((error) => {
                        console.log(error)
                        res.status(401).send(false)
                    })
    })

    app.get('/api/get/allAlbums', async(req, res)=> {
        await pool.query(`select a.*, u.username from albums a
        left join users u on a.user_id = u.uid`)
                    .then((q_res) => {
                        res.send(q_res.rows)
                    }).catch((error) => {
                        console.log(error)
                        res.status(401).send(false)
                    })
    })

    app.get('/api/get/allPlaylists', async(req, res)=> {
        await pool.query(`select p.*, u.username from playlists p
        left join users u on p.user_id = u.uid 
        WHERE p.public_status = true`)
                    .then((q_res) => {
                        res.send(q_res.rows)
                    }).catch((error) => {
                        console.log(error)
                        res.status(401).send(false)
                    })
    })



    app.delete('/api/delete/trackById', async(req, res)=> {
        let song_id = req.query.song_id
        let song_owner_id = req.query.user_id
        let s3_audio_key= req.query.s3_audio_key
        let s3_image_key= req.query.s3_image_key

        if(song_owner_id != req.user.uid)
            return res.status(401).send({message: "This is Not Your Property!!"})
        
        deleteAudioFromS3(s3_audio_key)
        deleteAudioImageFromS3(s3_image_key)
        
        
        await pool.query(`DELETE FROM songs 
                          WHERE song_id=$1 and user_id=$2`, [song_id, song_owner_id])
                  .then((q_res) => {
                    console.log("Removed Song ID: ", song_id)
                     return res.status(200).send(true)
                  }).catch(err => {
                      return res.status(401).send({message: "This Item Is Already Removed!!"})
                  })

    })



    app.delete('/api/delete/playlistById', async(req, res)=> {
        let playlist_id = req.query.playlist_id
        let user_id = req.query.user_id
        let s3_playlist_image_key= req.query.s3_playlist_image_key

        console.log([playlist_id,user_id,s3_playlist_image_key])
        if(user_id != req.user.uid)
            return res.status(401).send({message: "This is Not Your Property!!"})
        
        
        deletePlaylistImageFromS3(s3_playlist_image_key)
        
        await pool.query(`DELETE FROM playlists 
        WHERE playlist_id=$1 and user_id=$2`, [playlist_id, user_id])
            .then((q_res) => {
            console.log("Removed Playlist ID: ", playlist_id)
            return res.status(200).send(true)
            }).catch(err => {
                return res.status(401).send({message: "This Item Is Already Removed!!"})
            })

    })


    app.delete('/api/delete/albumById', async(req, res) => {
        let album_id = req.query.album_id
        let user_id = req.query.user_id
        let s3_album_image_key= req.query.s3_album_image_key

        console.log([album_id,user_id,s3_album_image_key])
        if(user_id != req.user.uid)
            return res.status(401).send({message: "This is Not Your Property!!"})
        
        
        deleteAlbumImageFromS3(s3_album_image_key)
        
        await pool.query(`DELETE FROM albums 
        WHERE album_id=$1 and user_id=$2`, [album_id, user_id])
            .then((q_res) => {
            console.log("Removed Playlist ID: ", album_id)
            return res.status(200).send(true)
            }).catch(err => {
                return res.status(401).send({message: "This Item Is Already Removed!!"})
            })
    })

    
}