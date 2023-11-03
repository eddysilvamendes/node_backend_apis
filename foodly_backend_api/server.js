const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 6002;
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const restaurantRouter = require("./routes/restaurant");
const categoryRouter = require("./routes/category");
const foodRouter = require("./routes/food");

dotenv.config();

//Initialize Firebase Database
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

//After initialize the mongoose check de db connection based on url
//Connect to DB and then if success print ok in log,if not print catch error and print
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", authRouter);
app.use("/api/users", userRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/category", categoryRouter);
app.use("/api/food", foodRouter);
app.listen(process.env.PORT || port, () =>
  console.log(`Foodly Backend API app listening on port ${process.env.PORT}!`)
);
