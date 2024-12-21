import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { fullname, email } = req.body;
  let newUser = new User({
    fullname,
    email,
  });
  newUser = await newUser.save();
  res.status(201).json({
    msg: "User created successfully",
    error: false,
    data: newUser,
  });
});

router.get("/", async (req, res) => {
  const users = await User.find();
  if (!users || users.length === 0)
    return res.status(404).json({
      msg: "User not found",
      error: true,
      data: null,
    });
  res.status(200).json({
    msg: "User fetched successfully",
    error: false,
    data: users,
  });
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res.status(404).json({
        msg: "User not found",
        error: true,
        data: null,
      });

    res.status(200).json({
      msg: "User found successfully",
      error: false,
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      msg: "Something went wrong",
      data: null
  })
  }
});

router.put("/:id", async (req, res) => {
  const { fullname, email } = req.body;
  const user = await User.findById(req.params.id)
  if (!user)
    return res.status(404).json({
      msg: "User not found",
      error: true,
      data: null,
    });

  if (fullname) user.fullname = fullname;
  if (email) user.email = email;

  await user.save()

  res.status(200).json({
    msg: "User updated successfully",
    error: false,
    data: user,
  });
});



export default router;
