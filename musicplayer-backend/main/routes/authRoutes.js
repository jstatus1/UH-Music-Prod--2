const passport = require('passport');
var pool = require('../db')
const bcrypt = require('bcryptjs')


module.exports = app => {
  app.get(

    //Google OAuth
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/discovery');
    }
  );

  app.post('/auth/login', (req, res, next ) => {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) { return res.json( { message: info.message }) }
      res.json({message: {validPassword:true}})
    
      })(req, res, next);   
  });

  app.post('/auth/login/callback', (req, res, next) => {
    passport.authenticate('local')(req, res, next)
  });



  app.post('/auth/register', async (req, res) => {
    let email = req.body.email
    let username = req.body.username
    let password = req.body.password
    

    
    //check to see if the user already exist
      await pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
        async (err, results) => {
        if (err) {
          throw err;
        }

        if (results.rows.length > 0) {
          return res.send({status: true, message: {
            userExist: true
          }})
        }else {
          const hashedPassword = await bcrypt.hash(password, 10);
          
          const value = [username, email,hashedPassword]

          await pool.query(`INSERT INTO users(username, email, password)
                            VALUES($1, $2, $3)
                            ON CONFLICT DO NOTHING`,value, async (error, result)=> {
                              if(error)
                              {
                                res.send({status: false, message: 'Failed To Create User'})
                              }else
                              {
                                res.send({status: true, message: {
                                  userExist: true
                                }})
                              }
                            })
        }
      })
    }
  )

  

  //Others
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    console.log(req.user)
    res.send(req.user);
  });


  //check if user exist with email
  app.get('/api/checkEmail', async (req, res) => {
      let email = req.query.email
      await  pool.query(
        `SELECT * FROM users WHERE email = $1`,
        [email],
        (err, results) => {
        if (err) {
          throw err;
        }
        
        if (results.rows.length > 0) {
          return res.send({status: true, message: {
            userExist: true
          }})
        }else {
          return res.send({status: true, message: {
            userExist: false
          }})
        }
      });
  })



  
  app.post('/api/updateProfile', async (req, res, next) => {

    console.log(req.body)
      let old_username = req.body.queryInput.old_username
      let username = req.body.queryInput.username 
      let new_password = req.body.queryInput.new_password 
      let first_name = req.body.queryInput.first_name 
      let last_name = req.body.queryInput.last_name 
      let email = req.body.queryInput.email 
      let about_me = req.body.queryInput.about_me 

      let test_value = [username, new_password, first_name, last_name, email, about_me, old_username ]
      console.log(test_value)
      let value = []

      let hashedNewPassword =  await bcrypt.hash(new_password, 10);
      let query = ``

      if (new_password !== null) {
        value = [username, hashedNewPassword, first_name, last_name, email, about_me, old_username ]
        query = `UPDATE users 
                 SET username = $1, password = $2, first_name = $3, last_name = $4, email = $5, about_me = $6
                 WHERE username = $7`
      }
      else {
        value = [username, first_name, last_name, email, about_me, old_username ]
        query = `UPDATE users 
        SET username = $1, first_name = $2, last_name = $3, email = $4, about_me = $5
        WHERE username = $6`
      }


      await pool.query(query,value, (q_err, q_res)=> {
                              if(q_err) {
                                console.log(q_err);
                                res.status(401).send({status: false});
                                
                              }
                              else {
                                res.send({status: true}) 
                                }})
                              }
                            )

  }




