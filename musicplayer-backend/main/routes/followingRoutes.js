var pool = require('../db')

module.exports = app => {

    app.post('/api/toggle/follows', async(req, res) => {

        let personToFollow = req.body.personToFollow
        let isFollowing = req.body.isFollowing
        
        //Query to see if there is a row already
        await pool.query(`Select * FROM follows where user_id=$1 and follower_id=$2`,
        [personToFollow, req.user.uid],
         async(q_err, q_res)=> {
             if(q_err) 
             {
                 console.log(q_err)
                 res.send({status: false, message: 'Sorry, Servers Are Down'})
             }

             let rowLength = q_res.rows.length
             if(isFollowing)
             {
                //unfollow
                if(rowLength == 0)
                    res.send({isFollowing: false})
                else
                    pool.query(`DELETE FROM follows WHERE user_id=$1 AND follower_id=$2`,
                    [personToFollow, req.user.uid],
                    async(q_err,q_res)=> {
                        if(q_err) 
                        {
                            console.log(q_err)
                            res.status(200).send({status: false, message: 'Sorry, Servers Are Down'})
                        }
                        res.status(200).send({isFollowing: false, message: 'Successfully Unfollowed'})
                    })

             }else{
                //follow
                
                if(rowLength == 0)
                {
                    pool.query(`INSERT INTO 
                                follows(user_id, follower_id) 
                                VALUES ($1, $2)
                                ON CONFLICT DO NOTHING`,
                    [personToFollow, req.user.uid],
                    async(q_err,q_res)=> {
                        if(q_err) 
                        {
                            console.log(q_err)
                            res.status(401).send({status: false, message: 'Sorry, Servers Are Down'})
                        }
                        res.status(200).send({isFollowing: true, message: 'Successfully Unfollowed'})
                    })
                }
                else
                    res.status(200).send({isFollowing: true})
                    
             }
         })
        
        
    
    })
}