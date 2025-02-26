const express = require("express");
const {
  signupUser,
  loginUser,
  getUserProfile,
} = require("../controllers/user");
const { protect } = require("../middlewares/auth");
const { restrictTo } = require("../middlewares/role");

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

router.get("/profile", protect, getUserProfile);

// router.get("/admin-only", protect, restrictTo("admin"), (req, res) => {
//   res.status(200).json({ message: "Welcome, admin!" });
// });

// router.get("/seller-only", protect, restrictTo("seller"), (req, res) => {
//   res.status(200).json({ message: "Welcome, seller!" });
// });

// router.get("/client-only", protect, restrictTo("client"), (req, res) => {
//   res.status(200).json({ message: "Welcome, client!" });
// });

// router.get(
//   "/shared-route",
//   protect,
//   restrictTo("admin", "seller"),
//   (req, res) => {
//     res.status(200).json({ message: "Welcome to the shared route!" });
//   }
// );

module.exports = router;
