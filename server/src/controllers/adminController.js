import { asyncHandler } from "../utils/asyncHandler.js";
import { Admin } from "../models/adminModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new admin
// @route   POST /api/admin/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const adminExists = await Admin.findOne({ username });

  if (adminExists) {
    res.status(400);
    throw new Error("Admin already exists");
  }

  const admin = await Admin.create({
    username,
    password,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid admin data");
  }
});

// @desc    Auth admin & get token
// @route   POST /api/admin/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const admin = await Admin.findOne({ username });

  if (admin && (await Admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      username: admin.username,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
});

export { register, login };
