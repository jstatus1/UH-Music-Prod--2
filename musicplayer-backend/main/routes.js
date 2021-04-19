var express = require('express')
var router = express.Router()
var pool = require('./db')
const bcrypt = require("bcryptjs");
const { json } = require('body-parser');





/*
   Passport Registration
*/

// router.post('/api/posts/userprofiletodb', (req, res, next) => {
//   const values = [req.body.profile.nickname, req.body.profile.email, req.body.profile.email_verified]
//   pool.query(`INSERT INTO users(username, email, email_verified, date_created)
//               VALUES($1, $2, $3, NOW())
//               ON CONFLICT DO NOTHING`, values,
//               (q_err, q_res) => {
//                 res.json(q_res.rows)
//       })
// } )

// router.get('/api/get/userprofilefromdb', (req, res, next) => {
//   const email = String(req.query.email)
//   console.log(email)
//   pool.query(`SELECT * FROM users
//               WHERE email=$1`, [ email ],
//               (q_err, q_res) => {
//                 res.json(q_res.rows)
//       })
// } )

router.post("/register",async (req,res)=> {
  const email = req.body.email
  //check to see if email already exists
  await pool.query(`SELECT * FROM users WHERE email=$1 LIMIT 1`, [email], 
                 async (q_err, q_res) => {
                  
                  if(q_res.rows.length > 0)
                  {
                    console.log(q_res.rows[0])
                    return res.status(400).send({message: 'This User Already Exists'})
                  }else{
                      //if Does Not exist send profile to database
                      const hashedPassword = await bcrypt.hash(req.body.password, 10);
                      const values = [req.body.username, req.body.email, req.body.email_verified, hashedPassword]
                      await pool.query(`INSERT INTO users(username, email, email_verified, password, date_created)
                                  VALUES($1, $2, $3, $4, NOW())
                                  ON CONFLICT DO NOTHING`, values,
                                  (q_err, q_res) => {
                                    return res.send(q_res.rows[0])
                        })
                  }  
    })
})

router.post('/login', (req, res)=> {

})

router.get('/user', (req, res)=> {
  
})

/*
    POSTS ROUTES SECTION
*/

router.get('/api/get/allposts', (req, res, next ) => {
    pool.query("SELECT * FROM posts ORDER BY date_created DESC", (q_err, q_res) => {
        res.json(q_res.rows)
    })
  })
  
  
  router.post('/api/post/posttodb', (req, res, next) => {
    const values = [req.body.title, req.body.body, req.body.uid, req.body.username]
    pool.query(`INSERT INTO posts(title, body, user_id, author, date_created)
                VALUES($1, $2, $3, $4, NOW() )`, values, (q_err, q_res) => {
            if(q_err) return next(q_err);
            res.json(q_res.rows)
      })
  })
  
  router.put('/api/put/post', (req, res, next) => {
    const values = [req.body.title, req.body.body, req.body.uid, req.body.pid, req.body.username]
    pool.query(`UPDATE posts SET title= $1, body=$2, user_id=$3, author=$5, date_created=NOW()
                WHERE pid = $4`, values,
                (q_err, q_res) => {
                  console.log(q_res)
                  console.log(q_err)
          })
  })
  
  router.delete('/api/delete/postcomments', (req, res, next) => {
    const post_id = req.body.post_id
    pool.query(`DELETE FROM comments
                WHERE post_id = $1`, [post_id],
                (q_err, q_res) => {
                    res.json(q_res.rows)
                    console.log(q_err)
          })
  })
  
  router.delete('/api/delete/post', (req, res, next) => {
    const post_id = req.body.post_id
    pool.query(`DELETE FROM posts WHERE pid = $1`, [ post_id ],
                (q_err, q_res) => {
                  res.json(q_res.rows)
                  console.log(q_err)
         })
  })
  
  /*
      COMMENTS ROUTES SECTION
  */
  
  
  router.post('/api/post/commenttodb', (req, res, next) => {
    const values = [ req.body.comment, req.body.user_id, req.body.username, req.body.post_id]
  
    pool.query(`INSERT INTO comments(comment, user_id, author, post_id, date_created)
                VALUES($1, $2, $3, $4, NOW())`, values,
                (q_err, q_res ) => {
                    res.json(q_res.rows)
                    console.log(q_err)
        })
  })
  
  router.put('/api/put/commenttodb', (req, res, next) => {
    const values = [ req.body.comment, req.body.user_id, req.body.post_id, req.body.username, req.body.cid]
  
    pool.query(`UPDATE comments SET
                comment = $1, user_id = $2, post_id = $3, author = $4, date_created=NOW()
                WHERE cid=$5`, values,
                (q_err, q_res ) => {
                    res.json(q_res.rows)
                    console.log(q_err)
        })
  })
  
  
  router.delete('/api/delete/comment', (req, res, next) => {
    const cid = req.body.cid
  
    pool.query(`DELETE FROM comments
                WHERE cid=$1`, [ cid ],
                (q_err, q_res ) => {
                    res.json(q_res.rows)
                    console.log(q_err)
        })
  })
  
  
  router.get('/api/get/allpostcomments', (req, res, next) => {
    const post_id = String(req.query.post_id)
    console.log(post_id)
    pool.query(`SELECT * FROM comments
                WHERE post_id=$1`, [ post_id ],
                (q_err, q_res ) => {
                    console.log(q_res)
                    res.json(q_res.rows)
                    console.log(q_err)
        })
  })


/*
  USER PROFILE SECTION
*/

router.post('/api/posts/userprofiletodb', (req, res, next) => {
    const values = [req.body.profile.nickname, req.body.profile.email, req.body.profile.email_verified]
    pool.query(`INSERT INTO users(username, email, email_verified, date_created)
                VALUES($1, $2, $3, NOW())
                ON CONFLICT DO NOTHING`, values,
                (q_err, q_res) => {
                  res.json(q_res.rows)
        })
  } )
  
  router.get('/api/get/userprofilefromdb', (req, res, next) => {
    const email = String(req.query.email)
    console.log(email)
    pool.query(`SELECT * FROM users
                WHERE email=$1`, [ email ],
                (q_err, q_res) => {
                  res.json(q_res.rows)
        })
  } )
  
  router.get('/api/get/userposts', (req, res, next) => {
    const user_id = req.query.user_id
    console.log(user_id)
    pool.query(`SELECT * FROM posts
                WHERE user_id=$1`, [ user_id ],
                (q_err, q_res) => {
                  res.json(q_res.rows)
        })
  } )
  
  
  router.put('/api/put/likes', (req, res, next) => {
    const uid = [req.body.uid]
    const post_id = String(req.body.post_id)
  
    const values = [ uid, post_id ]
    console.log(values)
    pool.query(`UPDATE posts
                SET like_user_id = like_user_id || $1, likes = likes + 1
                WHERE NOT (like_user_id @> $1)
                AND pid = ($2)`,
       values, (q_err, q_res) => {
      if (q_err) return next(q_err);
      console.log(q_res)
      res.json(q_res.rows);
    });
  });

  router.get('/api/get/allsongs', (req, res, next) => {
    pool.query(`SELECT a.*, b.username FROM songs a, users b
                where a.user_id = b.uid;`, [], (q_err, q_res) => {
      res.json(q_res.rows);
    })
  });

  router.get('/api/get/allalbums', (req, res, next) => {
    pool.query(`SELECT a.*, b.username FROM albums a, users b
                where a.user_id = b.uid;`, [], (q_err, q_res) => {
      res.json(q_res.rows);
    })
  });

  router.get('/api/get/allplaylists', (req, res, next) => {
    pool.query(`SELECT a.*, b.username FROM playlists a, users b
                where a.user_id = b.uid;`, [], (q_err, q_res) => {
      res.json(q_res.rows);
    })
  });

  function searchFormLogic(prefixtable, varname, variable, $number) {
    if (variable == 'nodata')
      return `$` + $number + ` = ` + '$' + $number
    else {
      if (prefixtable != '') 
        return prefixtable + `.` + varname + ` = $` + $number;
      else       
        return  varname + ` = $` + $number;
    }
  };

  router.get('/api/get/reports/users', (req,res,next) => {
    const username = req.query.username == '' ? 'nodata': req.query.username;
    const first_name = req.query.first_name == '' ? 'nodata' : req.query.first_name;
    const last_name = req.query.last_name == '' ? 'nodata' : req.query.last_name;
    const isMusician = req.query.isMusician;
    const record_label = req.query.record_label == '' ? 'nodata': req.query.record_label;
 
    const values = [ username, first_name, last_name ]
    console.log(values);

    const query = `SELECT username, musician, first_name, last_name, socialmedia_fb, record_label
    socialmedia_tw, socialmedia_in, record_label, num_listeners 
    FROM users 
    WHERE ${searchFormLogic('','username', username, 1)} AND
          ${searchFormLogic('','first_name',first_name,2)} AND
          ${searchFormLogic('','last_name',last_name,3)}`;

    console.log(query);

    pool.query(query, values, (q_err, q_res) => {
                  if(q_err)
                  {
                    console.log(q_err)
                  }
                  console.log(q_res.rows)
                  res.json(q_res.rows);
                });
  });

  router.get('/api/get/reports/songs', (req,res,next) => {
    const title = req.query.title == '' ? 'nodata': req.query.title;
    const username = req.query.username == '' ? 'nodata' : req.query.username;
    const album_title = req.query.album_title == '' ? 'nodata' : req.query.album_title;
    const first_name = req.query.first_name == '' ? 'nodata' : req.query.first_name;
    const last_name = req.query.last_name == '' ? 'nodata' : req.query.last_name;
    const record_label = req.query.record_label == '' ? 'nodata' : req.query.record_label;

    const values = [ title, username, first_name, last_name, album_title ]
    console.log(values);



    const query = `SELECT S.title, U.username,  U.first_name, U.last_name, A.album_title, S.duration, S.release_date, S.record_label
                  FROM  songs S, albums A, users U
                  WHERE S.user_id = U.uid AND
                        ${searchFormLogic('S','title',title, 1)} AND
                        ${searchFormLogic('U','username',username,2)} AND
                        ${searchFormLogic('U','first_name',first_name,3)} AND
                        ${searchFormLogic('U','last_name',last_name,4)} AND
                        ${searchFormLogic('A','album_title',album_title,5)}`
                        ;

    console.log(query);

    pool.query(query, values, (q_err, q_res) => {
                  if(q_err)
                  {
                    console.log(q_err)
                  }
                  console.log(q_res.rows)
                  res.json(q_res.rows);
                });
  });

  router.get('/api/get/reports/albums', (req,res,next) => {
    const album_title = req.query.album_title == '' ? 'nodata': req.query.album_title;
    const username = req.query.username == '' ? 'nodata': req.query.username;
    const first_name = req.query.first_name == '' ? 'nodata' : req.query.first_name;
    const last_name = req.query.last_name == '' ? 'nodata' : req.query.last_name;
    
 
    const values = [ album_title, username, first_name, last_name ]
    console.log(values);

    const query = `select A.album_title, U.username, U.first_name, U.last_name, A.album_duration, A.release_date
    from users U, albums A
    where A.user_id = U.uid AND
        ${searchFormLogic('A','album_title',album_title,1)} AND 
        ${searchFormLogic('U','username',username,2)} AND
        ${searchFormLogic('U','first_name',first_name,3)} AND
        ${searchFormLogic('U','last_name',last_name,4)}`;

    console.log(query);

    pool.query(query, values, (q_err, q_res) => {
                  if(q_err)
                  {
                    console.log(q_err)
                  }
                  console.log(q_res.rows)
                  res.json(q_res.rows);
                });
  });

  router.get('/api/get/reports/playlists', async (req,res,next) => {
    const playlist_name = req.query.playlist_name == '' ? 'nodata': req.query.playlist_name;
    const username = req.query.username == '' ? 'nodata': req.query.username;
    const first_name = req.query.first_name == '' ? 'nodata' : req.query.first_name;
    const last_name = req.query.last_name == '' ? 'nodata' : req.query.last_name;
    
 
    const values = [ playlist_name, username, first_name, last_name ]
    console.log(values);

    const query = `select P.playlist_name, U.username, U.first_name, U.last_name
    from playlists P, users U
    where P.user_id = U.uid AND
        ${searchFormLogic('P','playlist_name',playlist_name,1)} AND 
        ${searchFormLogic('U','username',username,2)} AND
        ${searchFormLogic('U','first_name',first_name,3)} AND
        ${searchFormLogic('U','last_name',last_name,4)}`;

    console.log(query);

    pool.query(query, values, (q_err, q_res) => {
                  if(q_err)
                  {
                    console.log(q_err)
                  }
                  console.log(q_res.rows)
                  res.json(q_res.rows);
                });
  });

  router.get('/api/delete/song', async (req,res,next) => {
    const title = req.query.title;
    const username = req.query.username; 
    const first_name = req.query.first_name; 
    const last_name = req.query.last_name; 
    const album_title = req.query.album_title; 
    const record_label = req.query.record_label;
    
    const values = [ title, username ]
    console.log(values)

    const query = `DELETE FROM songs WHERE title = $1 
                  AND user_id = (SELECT uid FROM users WHERE users.username = $2)`

    console.log(query)

    await pool.query(query, values, (q_err, q_res)=> {
      if(q_err) {
        console.log(q_err);
        res.status(401).send({ status: false });
        
      }
      else {
        
        res.send({status: true}) 
        }})
                            
  })
  

module.exports = router