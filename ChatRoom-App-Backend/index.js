const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require('cors')
///App 
const app = express();

//port
const port = process.env.PORT || 5000; 

//Config //env variable
dotenv.config({ path: "./config/config.env" }); 

//cors
app.use(cors());

// DB Connection
const connectDB = require('./config/db')
connectDB();

//Body Parsing
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }))
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))

///Routes Import 
const user = require('./Routes/User')
const chatRoom = require('./Routes/Rooms')
const {addUser,removeUser,getUsers} = require('./socket/users')

///Middleware
app.use("/api/v1/auth",user);
app.use('/api/v1/room',chatRoom);


// Environment Setup
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

const server = app.listen(port, () => {
    console.log(
      `App running in ${process.env.NODE_ENV} listening on port ${port}`
    );
  });

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
 });

 app.use(function (req, res, next) {
  req.io = io;
  next();
});

io.on("connection", (socket) => {
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (data) => {
     console.log("ADDING USER", data);
     addUser(data.userId, socket.id);
     io.emit("userAdded", {user:data.userId, type:'connect'});
  });

  socket.on("sendMessage", (data) => {
    console.log(data);
    const messages = addMessage(data)
    io.emit('ReceiveMessage', messages);
 });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    const user =  removeUser(socket.id);
     // console.log("");
    io.emit("userStatusChange", {user, type:'disconnect'});
  });

});
  
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error ${err.message}`);
  server.close(() => process.exit(1));
});