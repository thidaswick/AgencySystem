//FFpVFcqlLtbPxZ4A
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const adminRoutes = require("./route/admin");
app.use("/admin", adminRoutes);

const { createDefaultAdmin } = require("./controllers/adminController");

app.get("/", (req, res) => {
  res.send("Welcome to the Raxwo Technologies");
});

mongoose.connect("mongodb+srv://RaxwoAgency:FFpVFcqlLtbPxZ4A@cluster0.saydskb.mongodb.net/")
.then(async ()=>{
    console.log("Connected to MongoDB");
    await createDefaultAdmin();
    app.listen(5000);
})
.catch((err)=>console.log(err));