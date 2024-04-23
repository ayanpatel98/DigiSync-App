const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserNewsSchema = new Schema({
    news_id:{
        type: String,
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    author:{
        type: String,
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    url:{
        type: String,
    },
    urlToImage:{
        type: String,
    },
    publishedAt:{
        type: String,
    },
    content:{
        type: String,
    },
  });

  module.exports = mongoose.model('usernews', UserNewsSchema);