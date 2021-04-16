var AWS  = require('aws-sdk')
var multer = require('multer')
const fileUpload = require('express-fileupload');
const fileSystem = require('fs');
const { v4: uuidv4 } = require('uuid');

// set storage
var storage = multer.diskStorage({
    destination : function ( req , file , cb ){
        cb(null, './storage')
    },
    filename : function (req, file , cb){
        // image.jpg
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));

        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

var upload = multer({dest:'musicUploads'})


async function uploadFile(fileName, fileKey) {
    return new Promise(async function(resolve, reject) {
        const params = {
            Bucket: 'musicplayer-song', // pass your bucket name
            Key: fileKey,
            ACL: 'public-read',
            Body: fileSystem.createReadStream(fileName.path),
            ContentType: fileName.type
        };

        await s3.upload(params, function(s3Err, data) {
        if (s3Err){
        reject(s3Err);
        }

        console.log(`File uploaded successfully at ${data.Location}`);
        resolve(data.Location);
        });
    });
}


/*---------------------S3--------------------------------*/
module.exports = app => {
    
    AWS.config.update({region: 'us-east-2'});
    s3 = new AWS.S3({apiVersion: '2006-03-01'});
    s3.listBuckets(function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Buckets);
    }
    });

    app.post('/api/upload/', upload.array('musicUploads', 2), function(req, res, err) {
        if (err) {
          console.log('error');
          console.log(err);
          return res.end();
        }
        var file = req.files;
        res.end();
        console.log(req.files);
      });
}
