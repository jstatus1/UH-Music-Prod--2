var pool = require('../db');

module.exports = app => {

    //join songs on id and take all the column from songs and id
    
    //Tracks
    app.get('/api/get/tracks', (req, res) => {
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
        
        pool.query(`SELECT *
        FROM playlists WHERE user_id=$1`,[user_id]).then(
            data => {
                res.send(data.rows)
            }
        ).catch(error=> {
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

    
}