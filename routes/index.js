const express = require('express');

const postController = require('../controller/postController')
const homeController = require('../controller/homeControler')

const router = express.Router();

router.get('/', homeController.index)

router.get('/post/add', postController.add)
router.post('/post/add',postController.addAction)

router.get("/",(req, res)=>{
    res.render('home')
})



module.exports = router