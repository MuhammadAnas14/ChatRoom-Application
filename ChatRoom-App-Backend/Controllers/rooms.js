const asyncHandler = require("../Middleware/async");
const Rooms = require("../Models/Rooms");

exports.addUser = asyncHandler(async (req, res, next) => {
  const { UserName, UserId, RoomName } = req.body;

  const userExist = await Rooms.findOne({
    $and: [{ userId: UserId }, { Room: RoomName }],
  }).exec(function (err, user) {
    console.log("user in room", user);
    if (user) {
      return user;
    } //user already exists with email AND/OR phone.
    else {
      const user = Rooms.create({
        userName: UserName,
        userId: UserId,
        Room: RoomName,
      });
    } 
  });
  if (userExist) {
    return res.status(200).json({
      success: true,
      message: "User already exists in room",
    });
  }

  return res.status(200).json({
    success: true,
    message: "User created  in room",
  });
});

exports.getUsersInRoom = asyncHandler(async (req, res, next) => {
  const { RoomName, UserId } = req.params;

  console.log(req.params);

  let getUser = await Rooms.find({ Room: RoomName });
  console.log(getUser);

  Users = getUser.filter((x) => x.userId !== UserId);

  console.log(Users);

  return res.status(200).json({
    success: true,
    message: "All users",
    Users,
  });
});
