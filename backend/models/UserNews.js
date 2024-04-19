const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserNewsSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // ref: 'user'
    },
    author:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true, 
    },
    url:{
        type: String,
        required: true,
    },
    urlToImage:{
        type: String,
        required: true,
    },
    publishedAt:{
        type: String,
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
  });

  module.exports = mongoose.model('usernews', UserNewsSchema);