import User from "../models/User.js";
import tryCatch from "./utils/tryCatch.js";

export const getUsers = tryCatch(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json({ success: true, result: users });
});

export const getUserFilter = tryCatch(async (req, res) => {
  // sort should look like this: { "field": "userId", "sort": "desc"}
  const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

  // formatted sort should look like { userId: -1 }
  const generateSort = () => {
    const sortParsed = JSON.parse(sort);
    const sortFormatted = {
      [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
    };

    return sortFormatted;
  };
  const sortFormatted = Boolean(sort) ? generateSort() : {};

  const users = await User.find({
    $or: [
      { name: { $regex: new RegExp(search, "i") } },
      { email: { $regex: new RegExp(search, "i") } },
    ],
  })
    .sort(sortFormatted)
    .skip(page * pageSize)
    .limit(pageSize);

  const total = await User.countDocuments({
    name: { $regex: search, $options: "i" },
  });

  res.status(200).json({
    success: true,
    users,
    total,
  });
});

export const updateProfile = tryCatch(async (req, res) => {
  delete req.body["_id"];
  delete req.body["email"];

  const updatedUser = await User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    {
      new: true,
    }
  );

  const { _id: id, name, email } = updatedUser;
  res.status(200).json({ success: true, result: { id, name, email } });
});

export const deleteUser = tryCatch(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.userId);
  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ success: true, message: "User deleted successfully" });
});
