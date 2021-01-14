const express = require('express');
const MongoDB = require('mongodb');

const router = express.Router();

// GET Posts
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// POST posts
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
})

// loading to Mongo DB
async function loadPostsCollection() {
    const client = await MongoDB.MongoClient.connect(
        'mongodb+srv://artem123:qazwsx12@cluster0.4coc6.mongodb.net/estate', 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        );

    return client.db('estate').collection('posts');
}

module.exports = router;