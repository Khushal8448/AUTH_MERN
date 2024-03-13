import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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
