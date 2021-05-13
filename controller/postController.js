const mongoose = require('mongoose')
const Post = mongoose.model('Post')


// Rota de Pagina de criar post
exports.add = (req, res)=>{
    res.render('Post/postAdd')
};


//Rota de Pagina de mandar dados
exports.addAction = async(req, res) =>{
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
