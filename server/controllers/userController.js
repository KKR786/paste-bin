const User = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "30d" });
};

//getUsers
const getUsers = async (req, res) => {
  try {
    const userId = req.user._id;

    const users = await User.find({ _id: { $ne: userId } });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//search a friend
const searchFriend = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name } = req.body;
    if (!name) {
      throw new Error("No name provided");
    }
    const users = await User.find({ _id: { $ne: userId }, name: { $regex: new RegExp(`.*${name}.*`, 'i') } });
    console.log(users);
    if(users) {
      res.status(200).json(users)
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};
// //add friends
// const addFriends = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const friendId = req.body.friendId;
//     if (!userId || !friendId) {
//       throw new Error("User or Friend not found");
//     }
//     const user = await User.findByIdAndUpdate(
//       userId,
//       { $push: { friends: friendId } },
//       { new: true }
//     );
//     const friend = await User.findByIdAndUpdate(
//       friendId,
//       { $push: { friends: userId } },
//       { new: true }
//     );
//     res.status(200).json({ message: "Added Successfully" });
//   } catch (err) {
//     res.status(401).json(err);
//   }
// };
// //remove friends
// const removeFriends = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     const friendId = req.body.friendId;
//     if (!userId || !friendId) {
//       throw new Error("User or Friend not found");
//     }
//     const user = await User.findByIdAndUpdate(
//       userId,
//       { $pull: { friends: friendId } },
//       { new: true }
//     );
//   } catch {
//     res.status(401).json(err);
//   }
// };

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);
    const name = user.name;
    const id = user._id;

    res.status(200).json({ email, token, name, id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const userRegistration = async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = await User.signup(email, name, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token, name });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update user profile
const updateUserProfile = async (req, res) => {
  const id = req.params._id;

  if (isNaN(id)) {
    return res.status(404).json({ error: "User Not Found" });
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!updatedUser) {
    return res.status(400).json({ error: "No User Found" });
  } else {
    return res.status(200).json(updatedUser);
  }
};

// update user password
const updateUserPassword = async (req, res) => {
  const id = req.params._id;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (isNaN(id)) {
    return res.status(404).json({ error: `User${id} Not Found` });
  }

  const user = await User.findById({ _id: id });

  if (!user) {
    return res.status(404).json({ error: "User Not Found" });
  }

  const match = await bcrypt.compare(oldPassword, user.password);

  if (match) {
    if (newPassword === confirmPassword) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);

      const updatedPassword = await User.findByIdAndUpdate(
        { _id: id },
        { password: hash }
      );

      if (!updatedPassword) {
        return res.status(400).json({ error: "Password update failed" });
      } else {
        return res.status(200).json(updatedPassword);
      }
    } else {
      return res.status(400).json({ error: "Passwords do not match" });
    }
  } else {
    return res.status(400).json({ error: "Current password is incorrect" });
  }
};

module.exports = {
  userRegistration,
  loginUser,
  updateUserProfile,
  updateUserPassword,
  getUsers,
  searchFriend,
};
