const express = require('express');

const postController = require('../controller/postController')

const router = express.Router();


router.get('/post/add', postController.add)
router.post('/post/add',postController.addAction)

router.get("/",(req, res)=>{
    res.render('home')
})



module.exports = router