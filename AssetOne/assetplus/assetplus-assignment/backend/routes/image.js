const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const path = require('path')
const config = require('config');
const crypto = require('crypto');
const Image = require('../models/image');
const image = require('../models/image')


const db = config.get('mongoURI');

router.get('/files', (req, res) => {
    Image
      .find()
      .sort({date : -1})
      .then(images => {
          res.status(200).json({images})
  })
  })


//////////
  const conn = mongoose.createConnection(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});


// Init gfs
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
  });
  

// Create storage engine
const storage = new GridFsStorage({
    url: db,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
  
          if (err) {
            return reject(err);
          }
  
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
          };
          resolve(fileInfo);
  
        });
      });
    }
  });
  
  const upload = multer({ storage });

  // Setting the Routes here...

// @route   POST api/upload
// @desc    Upload an Image to database

router.post('/upload', upload.single('file'), (req, res) => {
    
    const newImage = new Image({
      address : req.file.filename,
      address_id : req.file.id
    })

    newImage
      .save()
      .then(img => 
          console.log('Image Saved')
      )
      .catch(err => console.log('Error in Image Uploading : '+err))
  
    res.json({
        file : req.file,
        msg : 'Image uploaded successfully', 
        success : true
    });

})

router.delete('/delete',  (req, res, id) => {
     var _id=req.body.id;
    res.json("Image deleded successfully")
    Image.deleteOne({_id:_id})
    .t
})

module.exports = router;
  