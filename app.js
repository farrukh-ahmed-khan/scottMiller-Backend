require('dotenv').config();
const cors = require('cors');
const express = require("express");
const multer = require("multer");
const { connectToMongoDB } = require("./connection");
const userRoute = require("./routes/user");
const { logReqRes } = require("./middlewares");

const app = express();
const port = process.env.PORT || 8001;
app.use(cors())
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

app.post("/upload", upload.single("profileImage"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  return res.redirect("/");
});

app.use("/api/user", userRoute);


connectToMongoDB(process.env.MONGO_URL);



app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
