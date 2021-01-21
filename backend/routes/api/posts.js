const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const stream = require('stream');
const { ObjectId } = require('mongodb');

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

router.delete('/:postId', async (req, res) => {
    // Delete files from /uploads/ folder
    const posts = await loadPostsCollection();

    const post = await posts.findOne({ "_id": ObjectId(req.params.postId) })
        .then(result => {
            return result;
        }).catch(err => console.log('Fail to find! ', err));
    
    fs.unlink(post.file.path, (err) => {
        if (err) throw err;
    });

    [].forEach.call(post.files, (file) => {
        fs.unlink(file.path, (err) => {
            if (err) throw err;
        });
    });
    
    // Delete this post from DB
    await posts.deleteOne({"_id": ObjectId(req.params.postId)})
        .then((result) => {
            return res.status(200).send(result);
        })
        .catch((err) => {
            console.log('Error of delete action', err.message);
            res.status(404).json({ error: err.message})
        });
})

// GET Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find().toArray());
});

router.get('/postDetails/:postId', async (req, res) => {
    const posts = await loadPostsCollection();

    return posts.findOne({ "_id": ObjectId(req.params.postId) })
        .then(result => {
            return res.send(result);
        })
        .catch(err => console.log('Fail to find! ', err));
});

// POST posts
router.post('/', upload.array('files', 15), async (req, res) => {
    const posts = await loadPostsCollection();

    await posts.insertOne({
        heading: req.body.heading,
        description: req.body.description,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        price: req.body.price,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        street: req.body.street,
        houseNumber: req.body.house,
        zip: req.body.zip,
        file: req.files.shift(),
        files: req.files,
    });

    res.status(201).send();
});

// loading to Mongo DB
async function loadPostsCollection() {
    return (await conn).collection('posts');
}

module.exports = router;