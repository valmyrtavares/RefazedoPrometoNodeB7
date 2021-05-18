module.exports.isLogged = (req, res, next)=>{
    if(!req.isAuthenticated()) {
        req.flash('error', 'Você não tem permissão para acessar essa página');
        res.redirect('/users/login');
        return;
    }
    next()
}

exports.changePassword = (req, res)=>{
    //Confirmar que as senhas batem abaiso segue uma forma de acessar variável com tracinho
    if(req.body.password != req.body['password-confirm']){
        req.flash('error',' Senhas não são iguais')
        res.redirect('/profile');
        return;
    }
    //Procurar o usuário e trocar a senha
    req.user.setPassword(req.body.password, async ()=> {
        await req.user.save();
        req.flash('success', 'Senha alterada com sucesso');
        res.redirect('/');
    })
    //Redirecinar para home
}