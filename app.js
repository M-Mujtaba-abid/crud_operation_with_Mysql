import express from "express"
import userRoute from "./routes/user.route.js" 
import producRoute from "./routes/product.route.js" 
const app=express()

app.use(express.json()); // to parse JSON request body
 
// test route
app.get("/", (req, res) => {
  res.json({ message: "Backend with MySQL is running 🚀" });
});


app.use("/users", userRoute)
app.use("/product", producRoute)




export default app