const mongoose = require('mongoose')
const Post = mongoose.model('Post')


// Rota de Pagina de criar post
exports.add = (req, res)=>{
    res.render('Post/postAdd')
};


//Rota de Pagina de mandar dados
exports.addAction = async(req, res) =>{
    req.body.tags = req.body.tags.split(',').map(t=>t.trim())
    const post = new Post(req.body)        

    try{
        await post.save();

    }catch(error){
        req.flash('error','Erro: ' + error.message)
        res.redirect('/post/add')
        return
    }
   req.flash('success','Post Salvo com sucesso')
    res.redirect('/')
} 

//Rota de Pagina de editar dados
exports.edit = async (req, res)=>{
    const post = await Post.findOne({slug:req.params.slug})
    res.render('Post/postEdit',{post})
}

//Rotas para enviar data editado para o banco
exports.editAction = async(req, res)=>{
    req.body.slug = require('slug')(req.body.title,{lower:true})
    req.body.tags = req.body.tags.split(',').map(t=>t.trim())
    
    try{
        const post = await Post.findOneAndUpdate(
            {slug:req.params.slug},
            req.body,
            {new:true, //Ele retorna os dados alterados
            runValidators:true}) //Faz com que as validações sejam obsercadas
    }catch(error){
        req.flash('error', 'Error: '+ error.message)
        res.redirect('/post/'+req.params.slug+'/edit')
    }
    req.flash('success', 'Post atualizado com sucesso')
    res.redirect('/')
}

exports.view = async(req, res)=>{
    const post = await Post.findOne({slug:req.params.slug})

    res.render('View',{post})
}