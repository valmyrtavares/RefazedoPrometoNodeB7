const User = require('../models/User')
const crypto = require('crypto')



exports.login = (req, res)=>{
    res.render('user/login')
}

exports.loginAction = (req, res)=>{
    const auth = User.authenticate();

    auth(req.body.email, req.body.password, (error, result)=>{
        if(!result){
            req.flash('error','Seu email ou senha estão errados')
            res.redirect('/users/login')
            return
        }
        req.login(result,()=>{})

        req.flash('success','Vc foi locado com sucesso')
            res.redirect('/')


    })
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
        res.redirect('/users/login')
    })
}

exports.logout = (req, res)=>{
    req.logout();
    res.redirect('/')
}

exports.profile = (req, res) =>{
    res.render('user/profile') 
}

exports.profileAction = async(req, res)=>{
  try{
      const user = await User.findOneAndUpdate(
          {_id:req.user._id},
          {name:req.body.name, email:req.body.email},
          { new:true, runValidators:true }
      );
    } catch (e) {
        req.flash('error', 'Ocorreu algum erro' + e.message );
        res.redirect('/profile')
        return;
    }
    req.flash('success', "Dados atualizados com sucesso")
    res.redirect('/profile')

};

exports.forget = (req, res)=>{
    res.render('user/forget')
}
exports.forgetAction =async (req, res) => {
    //Verificar se o usuário existe
    const user = await User.findOne ({email:req.body.email}).exec();
    if(!user) {
        req.flash('error', 'Esse email não existe');
        res.redirect('/users/forget')
        return
    }
    //Gerar um token com data de expiração e salvar no banco
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
    user.resetPasswordExpires = Date.now() + 3600000/ //1 hora

    await user.save()
    //Gerar link com token para trocar senha

    const resetLink = `http://${req.headers.host}/users/reset/${user.resetPasswordToken}`
    //Enciar o link para o usuário



    
    //Usuário vai acessar o link e trocar a senha
    req.flash('success', 'Enviamos um email com instruções ' + resetLink)
    res.redirect('/users/login')
}

exports.forgetToken = async (req, res)=>{
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordToken:{ $gt: Date.now()}
    }).exec();

    if(!user){
        req.flash('error', 'Token expirado');
        res.redirect('/users/forget');
        return
    }

    res.render('user/forgetPassword')
}

exports.forgetTokenAction = async(req, res)=>{
    const user = await User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordToken:{ $gt: Date.now()}
    }).exec();

    if(!user){
        req.flash('error', 'Token expirado');
        res.redirect('/users/forget');
        return
    }
      //Confirmar que as senhas batem abaiso segue uma forma de acessar variável com tracinho
      if(req.body.password != req.body['password-confirm']){
        req.flash('error',' Senhas não são iguais')
        res.redirect('back');
        return;
    }
    //Procurar o usuário e trocar a senha


    user.setPassword(req.body.password, async ()=> {
        await user.save();
        req.flash('success', 'Senha alterada com sucesso');
        res.redirect('/');
    })

}