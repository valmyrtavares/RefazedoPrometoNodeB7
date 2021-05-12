const mongoose = require('mongoose')
 const Post = mongoose.model('Post')



exports.add = (req, res)=>{
    res.render('Post/postAdd')
};

 exports.addAction = async(req, res) =>{
    const post = new Post(req.body)  
    console.log(post)
   await post.save();
    res.redirect('/')
 } 