import express from "express";

const users = [
  {
    fullname: "Bilal",
    email: "attari1235@gmail.com",
    id: 1,
  },
];

const router = express.Router();

router.post("/", (req, res) => {
  const { fullname, email } = req.body;
  users.push({ fullname, email, id: users.length + 1 });
  res.status(201).json({
    msg: "User added successfully",
    error: false,
    data: users,
  });
});

router.get("/", (req, res) => {
  res.status(200).json({
    msg: "User fetched successfully",
    error: false,
    data: users,
  });
});

router.get("/:id", (req, res) => {
  const user = users.find(({ id }) => id == req.params.id);
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
});

router.put("/:id", (req, res) => {
  const { fullname, email } = req.body;
  const user = users.find(({ id }) => id == req.params.id);
  if (!user)
    return res.status(404).json({
      msg: "User not found",
      error: true,
      data: null,
    });

    if(fullname) user.fullname = fullname
    if(email) user.email = email

    res.status(200).json({
        msg: "User updated successfully",
        error: false,
        data: user
    })
});

export default router;
