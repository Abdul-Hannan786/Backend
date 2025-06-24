import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/user.js";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import uploads from "./middleware/multer.js";

const app = express();
const PORT = 4000;
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log(err));

app.post("/create", async (req, res) => {
  const { fullname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  let user = await User.create({
    fullname,
    email,
    password: hashedPassword,
  });
  delete user.password;
  let token = jwt.sign({ ...user }, process.env.AUTH_SECRET);
  console.log(token);
  res.cookie("token", token);
  res.send({ user, token });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
});

app.post("/profile", (req, res) => {});

app.post("/upload", uploads.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    // const { userId } = req.user;
    const imageURL = req.file.path;
    const user = await User.findByIdAndUpdate(
      "6794b21be4f02d2f12b2d231",
      { profilePic: imageURL },
      { new: true }
    );
    res
      .status(201)
      .json({ message: "Image uploaded successfully", data: user });
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Failed to upload image" });
  }
});


// app.get("/profile/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findById(id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch user data" });
//   }
// });

app.get("/logout", (req, res) => [res.cookie("token", "")]);

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
