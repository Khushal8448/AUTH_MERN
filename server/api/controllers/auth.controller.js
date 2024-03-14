import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  const { username, email, password } = req.body;
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });

  if (!existedUser) {
    try {
      const hashedPassword = bcryptjs.hashSync(password, 10);

      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({
        message: `User created successfully`,
      });
    } catch (error) {
      next(errorHandler(500, "Internal Server Error!"));
    }
  } else {
    res.status(409).json({
      message: `User already exists`,
    });
  }
};
export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });

    // User not found
    if (!validUser) return next(errorHandler(404, "User not found!"));

    const isPasswordCorrect = bcryptjs.compareSync(password, validUser.password);

    // Wrong password
    if (!isPasswordCorrect) return next(errorHandler(400, "Invalid Inputs"));

    // Logged In User Response
    const loggedInUser = await User.findById(validUser._id).select("-password");

    console.log(loggedInUser);

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const expiryDate = new Date(Date.now() + 3600000); // 1 hour

    return res
      .cookie("access_token", token, { httpOnly: true, secure: true, expires: expiryDate })
      .status(201)
      .json({
        data: loggedInUser,
        message: "User logged in successfully",
      });
  } catch (error) {
    // Database error
    console.error("Error retrieving user:", error);
    return next(errorHandler(500, "Internal Server Error!"));
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

      const resUser = await User.findById(user._id).select("-password");

      const expiryDate = new Date(Date.now() + 3600000); // 1 hour

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          expires: expiryDate,
        })
        .status(201)
        .json({
          data: resUser,
          message: "User logged in successfully",
        });
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() + Math.floor(Math.random() * 10000),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      const data = await newUser.save();

      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      const resUser = await newUser.select("-password");

      const expiryDate = new Date(Date.now() + 3600000); // 1 hour
      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: true,
          expires: expiryDate,
        })
        .status(201)
        .json({
          data: resUser,
          message: "User logged in successfully",
        });
    }
  } catch (error) {
    next(errorHandler(500, error.message));
  }
};
