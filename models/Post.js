const mongoose = require("mongoose")
const slug = require('slug')

mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    photo:String,
    title:{
        type:String,
        trim:true,
        required:"O post precisa de um titulo"

    },
    slug:String,
    body:{
        type:String,
        trim:true
    },
    tags:[String]
});

postSchema.pre('save', async function(next){
    if(this.isModified('title')){
        this.slug = slug(this.title)

        //Regex para evitar slug duplicados
        const slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`, 'i')
        const postWithSlug = await this.constructor.find({slug:slugRegex})

        if(postWithSlug.length>0){
            this.slug = `${this.slug}-${postWithSlug.length + 1}`;
        }

    }
    next();
})
    //Agregate para trazer as tags direto do banco de dados
    postSchema.statics.getTagsList = function(){
        return this.aggregate([
            { $unwind:'$tags' },
            {$group:{_id:'$tags', count:{$sum:1}}},
            { $sort:{count:-1}}
        ]);
    }



module.exports = mongoose.model('Post', postSchema)