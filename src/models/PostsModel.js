const mongoose = require('mongoose')

const postsSchema = new mongoose.Schema(
    {
        title: {type: String, required: true, unique: true},
        image: {type: String, required: true},  
        description: {type: String, required: true},
        preview: {type: String},
    },
    {
        timestamps: true,
    }
);
const Posts = mongoose.model('Posts', postsSchema);
module.exports = Posts;