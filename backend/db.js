const mongoose = require('mongoose');

// Mongo connection string
// const mongoURI = "mongodb+srv://ayanpatel69:7jsj9OqDLi7DShCB@digisync-test.iblcj1j.mongodb.net/?retryWrites=true&w=majority&appName=DigiSync-Test";
const mongoURI = "mongodb://localhost:27017";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;