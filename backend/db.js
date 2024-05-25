const mongoose = require('mongoose');

// Mongo connection string
// const mongoURI = "mongodb://localhost:27017";
const mongoURI = "mongodb+srv://ayanpatel69:ayanpatel69@digisync-app.kxmydzz.mongodb.net/?retryWrites=true&w=majority&appName=DigiSync-App";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;