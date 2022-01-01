const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

//connecting...
mongoose.connect(dotenv.parsed.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//connection error
mongoose.connection.on('error',(err) => {
    console.log("Mongo db error"+err.message)
})

// connection on
mongoose.connection.once('open',() => {
    console.log("Mongo Db connected");
})

const app = require('./app');
app.listen(5000,() => {
    console.log(`
    ################################################
    🛡️  Server listening on port: 5000   🛡️
    ################################################`)
})