const mongoose = require("mongoose");

const ChatRoomSchema = new mongoose.Schema({
    userName:{
        type:String,
        require:true
    },
    userId : {
        type:String,
        require:true
    },
    Room:{
        type:String,
        require:true
    }
})

module.exports = mongoose.model('ChatRooms', ChatRoomSchema);