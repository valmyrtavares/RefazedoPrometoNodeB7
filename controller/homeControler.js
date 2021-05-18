const { response } = require('express');
const mongoose = require('mongoose')
const Post = mongoose.model("Post")

exports.index = async(req, res)=>{

    let responseJson = {
        posts:[],
        tags:[],
        tag:'',
        n:req.user
    }
 
    responseJson.tag = req.query.t;
    const postFilter = (responseJson.tag != undefined)?{tags:responseJson.tag}:{};

    //Código sogre aggregate que foi feito no post trazendo de la
    const tagsPromise =  Post.getTagsList();

    //Trazendo a tag selecionada que é gerda no ternário acima
    const postsPromise =  Post.findPosts(postFilter);

    //Desestruturando a promise para passar para os responseJson
    const [tags, posts ] = await Promise.all([tagsPromise, postsPromise])

    //console.log(posts[0])

    
    //Colocando cor nas tags da home
    for(let i in tags){
        if(tags[i]._id == responseJson.tag){
            tags[i].class = 'selected'
        }
    }

    responseJson.tags = tags  
    responseJson.posts = posts


    res.render('home',responseJson)
}