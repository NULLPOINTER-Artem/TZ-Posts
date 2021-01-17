const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const stream = require('stream');

// create storage for images
const storage = new multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './backend/routes/api/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

// init upload variable
const upload = multer({ storage });

// Mongo URI
const mongoURI = 'mongodb+srv://artem123:qazwsx12@cluster0.4coc6.mongodb.net/estate';

// Set connection to mongoDB
const conn = mongoose.createConnection(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const router = express.Router();

router.get('/uploads', (req, res) => {
    res.send();
})

router.get('/uploads/:filename', (req, res) => {
    const read = fs.createReadStream('./backend/routes/api' + req.url);

    const pass = new stream.PassThrough();
    stream.pipeline(
        read,
        pass,
        (err) => {
            if (err) {
                console.log(err);
                return res.sendStatus(400);
            }
        }
    );
    pass.pipe(res);
})


// GET Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find().toArray());
});

// POST posts
router.post('/', upload.single('file'), async (req, res) => {
    const posts = await loadPostsCollection();

    await posts.insertOne({
        heading: req.body.heading,
        price: req.body.price,
        address: req.body.address,
        file: req.file,
    });

    res.status(201).send();
});

// loading to Mongo DB
async function loadPostsCollection() {
    {// const client = await MongoDB.MongoClient.connect(
    //     'mongodb+srv://artem123:qazwsx12@cluster0.4coc6.mongodb.net/estate', 
    //     {
    //         useNewUrlParser: true,
    //         useUnifiedTopology: true
    //     }
    //     );
    }

    // return client.db('estate').collection('posts');
    return (await conn).collection('posts');
}

module.exports = router;