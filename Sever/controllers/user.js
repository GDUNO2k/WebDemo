import { UserModel } from "../models/userModel";

export const createUser = async (req, res) => {
  const { email, password, fullName, phoneNumber, address, major } = req.body;
  if (!email || !password || !fullName || !phoneNumber || !address || !major) {
    return res
      .status(400)
      .json({ sucess: false, message: "Vui long nhap day du thogn tin" });
  }
  const checkEmail = await UserModel.findOne({ email });
  if (checkEmail) {
    return res.status(400).json({ sucess: false, message: "Email da ton tai" });
  }
  const checkPhone = await UserModel.findOne({ phoneNumber });
  if (checkPhone) {
    return res.status(400).json({ sucess: false, message: "Email da ton tai" });
  }
  try {
    const newUser = req.body;
    const user = new UserModel(newUser);
    await user.save();

    return res
      .status(200)
      .json({ sucess: true, message: "Dang ky thanh cong", user: user });
  } catch (err) {
    return res.status(400).json({ sucess: false, message: "Co su co xay ra" });
  }
};

export const signIn = async (req, res) => {};
