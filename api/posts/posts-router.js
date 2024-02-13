// implement your posts router here
const express = require('express');
const post = require('./posts-model')
const router = express.Router();


// get methods
router.get('/', (req, res) => {
    post.find()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json({
                message: "The posts information could not be retrieved"
            })
        });
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    post.findById(id)
        .then((result) => {
            if (!result) res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
            res.status(200).json(result)
        }).catch(() => {
            res.status(500).json({ 
                message: "The post information could not be retrieved" })
        })
})


router.get('/:id/comments', async (req, res) => {
    const desiredPost = await post.findById(req.params.id)
    if (!desiredPost) {
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    }
    post.findPostComments(req.params.id)
        .then((result) => {
            res.status(200).json(result)
        }).catch(() => {
            res.status(500).json({
                message: "The comments information could not be retrieved"
            })
        })
})
// post methods
router.post('/', (req, res) => {
    if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }
    else post.insert(req.body)
        .then(async (result) => {
            const newPost = await post.findById(result.id)
        res.status(201).json(newPost)
        }).catch(() => {
            res.status(500).json({ 
                message: "There was an error while saving the post to the database"
            })
        })
})


// put requests
router.put('/:id', async (req, res) => {
    const oldPost = await post.findById(req.params.id)
    if (!oldPost) res.status(404).json({
        message: "The post with the specified ID does not exist"
    })
    else if (!req.body.title || !req.body.contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    }
    else post.update(req.params.id, req.body) 
        .then(async (result) => {
        res.status(200).json(await post.findById(result))
        }).catch(() => {
            res.status(500).json({
                message: "The post information could not be modified"
            })
        })
})


// delete handlers
router.delete('/:id', async (req, res) => {
    const oldPost = await post.findById(req.params.id)
    if (!oldPost) res.status(404).json({
        message: "The post with the specified ID does not exist"
    })
    else post.remove(req.params.id)
        .then((result) => {
            res.status(204).json(result)
        }).catch(() => {
            res.status(500).json({
                message: "The post could not be removed"
            })
        })
})

module.exports = router