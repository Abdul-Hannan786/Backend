import express from "express"
import UserRoutes from "./routes/user.js"


const app = express()
const PORT = 4000
app.use(express.json())

app.get("/", (req, res) => {
    res.send("<h1>Hello World</h1>")
})

app.use("/user", UserRoutes)



app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`))
