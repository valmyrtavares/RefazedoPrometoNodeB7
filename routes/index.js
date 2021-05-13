const express = require('express');

const postController = require('../controller/postController')
const homeController = require('../controller/homeControler')

const router = express.Router();

router.get('/', homeController.index)

router.get('/post/add', postController.add)
router.post('/post/add',postController.addAction)

router.get('/post/:slug/edit', postController.edit)
 router.post('/post/:slug/edit', postController.editAction)





module.exports = router