var pool = require('../db')


module.exports = app => {
    app.get('/api/get/search/users', (req, res) => {
        console.log(req.query.value)
        
        pool.query(`SELECT * FROM USERS WHERE username=$1 
        OR first_name=$1 OR last_name=$1 OR city=$1 AND NOT uid=$2`, [req.query.value,req.user.uid]).then((data)=>{
           
            if(data.rows.length ==0)
            {
                return res.send([])
            }

            let finalForm = []
            
           try
           {
            
            var getDataWithFollowedAttribute = new Promise(async (resolve, reject) => {
                data.rows.forEach(async (row) => {
                    let FollowUID = row.uid
                    console.log("Row:", row.uid)
                    await pool.query(`SELECT *, (SELECT COUNT(*) AS CURRENTLYFOLLOWS FROM follows AS f WHERE 
                    f.user_id=$1 AND f.follower_id=$2) FROM USERS WHERE users.uid = $1`, [FollowUID, req.user.uid], (q_err, q_res)=> {
                        if(q_err)
                        {
                            console.log(q_err)
                            return res.send({message: 'false'})
                        }
                        finalForm.push(q_res.rows)
                        if(data.rows.length == finalForm.length) resolve(1)
                        
                    })
                })
               
            })

            getDataWithFollowedAttribute.then(() => {
                res.send(finalForm)
            })
              

           }catch
           {
               return res.send({message: "fail"})
           }
            

        }).catch((err)=> {
            console.log(err)
            return res.send({message:null})
        })
    })


}