const express = require('express');

const postController = require('../controller/postController')
const homeController = require('../controller/homeControler')

const router = express.Router();
const imageMiddleware = require('../middlewares/imagemMiddlewares')

router.get('/', homeController.index)

router.get('/post/add', 
postController.add)
router.post('/post/add',
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.addAction)

router.get('/post/:slug/edit', postController.edit)
 router.post('/post/:slug/edit',
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.editAction)

 router.get('/post/:slug', postController.view)





module.exports = router