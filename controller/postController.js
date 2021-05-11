const mongoose = require('mongoose')
const Post = mongoose.model('Post')



exports.add = (req, res)=>{
    res.render('postAdd')
};