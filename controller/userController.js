const User = require('../models/User')



exports.login = (req, res)=>{
    res.render('user/login')
}


exports.register = (req, res)=>{
    res.render('user/register')
}

exports.registerAction = (req, res)=>{
   
    const newUser = new User(req.body)   
    User.register(newUser, req.body.password,(error)=>{
        if(error){
            req.flash('error','Ocorreu um erro, tente mais tarde')
            res.redirect('/users/register');
            return;
        }
        req.flash('success',' Registro efetuado com sucesso. Faça o seu login')
        res.redirect('/')
    })
}