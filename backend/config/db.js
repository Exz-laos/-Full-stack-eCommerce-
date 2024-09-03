// const mongoose = require('mongoose');


// async function connectDB() {

//     try{
//         await mongoose.connect(process.env.MONGODB_URI)
//     }catch(err){
//         console.log(err)
//     }
// }



// module.exports = connectDB

const mongoose = require('mongoose');

async function connectDB() {
    try {
        // Log connection attempts
        console.log('Attempting to connect to MongoDB...');
        
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Adjust timeout if needed
        });
        
        console.log('Connected to MongoDB successfully.');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1); // Exit if connection fails
    }
}

// Enable Mongoose debugging
mongoose.set('debug', true);

module.exports = connectDB;
