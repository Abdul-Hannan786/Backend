import express from "express";
import UserRoutes from "./routes/user.js";
import authRoutes from "./routes/authroutes.js"
import "dotenv/config";
import mongoose from "mongoose";
 
const app = express();
const PORT = 4000;
app.use(express.json());

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => console.log("Mongodb Connected"))
  .catch((err) => console.log(err))

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>");
});

app.use("/user", UserRoutes);
app.use("/auth", authRoutes)

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
