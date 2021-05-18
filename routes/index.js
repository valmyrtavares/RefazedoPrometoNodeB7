const express = require('express');

const postController = require('../controller/postController')
const homeController = require('../controller/homeControler')
const userController = require('../controller/userController')

const router = express.Router();
const imageMiddleware = require('../middlewares/imagemMiddlewares')
const authMiddleware = require('../middlewares/authMiddlewares')

//ROTAS PARA HOME
router.get('/', homeController.index)
//Importação ESTRANHA
//const{route} = require('../app')


//ROTAS PARA POST
router.get('/post/add',authMiddleware.isLogged,
postController.add)

router.post('/post/add',
    authMiddleware.isLogged,
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.addAction)

router.get('/post/:slug/edit', authMiddleware.isLogged, postController.edit)
 router.post('/post/:slug/edit',
    authMiddleware.isLogged,
    imageMiddleware.upload,
    imageMiddleware.resize,
    postController.editAction)

 router.get('/post/:slug', postController.view)

//ROTAS PARA USER
router.get('/users/login', userController.login)
router.post('/users/login', userController.loginAction)

router.get('/users/register', userController.register)
router.post('/users/register', userController.registerAction)

router.get('/users/logout', userController.logout)

router.get('/profile', authMiddleware.isLogged, userController.profile);
router.post('/profile', authMiddleware.isLogged, userController.profileAction);





module.exports = router