const express = require('express')
const router  = express.Router();

const {addUser,getUsersInRoom} = require('../Controllers/rooms')

router.post("/joinRoom", addUser);
router.get("/getAllUsers/:UserId/:RoomName" , getUsersInRoom);

module.exports = router;