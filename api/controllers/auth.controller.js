import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  const existedUser = await User.findOne({ username });

  if (!existedUser) {
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({
      message: `User created successfully`,
    });
  } else {
    res.status(409).json({
      message: `User already exists`,
    });
  }
};
