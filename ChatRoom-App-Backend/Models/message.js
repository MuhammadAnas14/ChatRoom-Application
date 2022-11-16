const mongoose = require("mongoose");

const MessagesSchema = new mongoose.Schema({
    Room:{
        type:String,
        require:true
    },
    Message:[
        {
            userId:{
                type:String,
                require:true 
            },
            userName:{
                type:String,
                require:true
            },
            text:{
                type:String,
                require:true
            },
            socketId:{
                type:String,
                require:true
            }
        }
    ]
})

module.exports = mongoose.model('Messages', MessagesSchema);