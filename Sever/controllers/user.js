import { UserModel } from "../models/userModel";

export const createUser = async (req, res) => {
  const { email, password, fullName, phoneNumber, address, major } = req.body;
  if (!email || !password || !fullName || !phoneNumber || !address || !major) {
    return res
      .status(400)
      .json({ sucess: false, message: "Vui long nhap day du thong tin" });
  }
  const checkEmail = await UserModel.findOne({ email });
  if (checkEmail) {
    return res.status(400).json({ sucess: false, message: "Email da ton tai" });
  }
  const checkPhone = await UserModel.findOne({ phoneNumber });
  if (checkPhone) {
    return res.status(400).json({ sucess: false, message: "SDT da ton tai" });
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

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ sucess: false, message: "Vui long nhap day du thong tin" });
  }
  try {
    const checkEmail = await UserModel.findOne({ email });
    if (!checkEmail || checkEmail.password !== password) {
      return res
        .status(400)
        .json({ sucess: false, message: "Sai ten dang nhap hoac mat khau" });
    }
    res.status(200).json({
      sucess: true,
      message: "Dang nhap thanh cong",
      user: checkEmail,
    });
  } catch (err) {
    return res.status(400).json({ sucess: false, message: "Co su co xay ra" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findOne({ _id: id });
    if (!user) {
      return res
        .status(400)
        .json({ sucess: false, message: "Khong tim thay nguoi dung" });
    }
    res.status(200).json({ user });
  } catch (err) {
    return res.status(400).json({ sucess: false, err });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUser = await UserModel.find();
    if (!allUser) {
      return res
        .status(400)
        .json({ sucess: false, message: "Khong ton tai nguoi dung nao" });
    }
    res.status(200).json({ allUser: allUser });
  } catch (err) {
    return res.status(400).json({ sucess: false, err });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await UserModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Xoa thanh cong" });
  } catch (err) {
    return res.status(400).json({ sucess: false, err });
  }
};

export const updateUser = async (req, res) => {
  const { fullName, phoneNumber, address, major } = req.body;
  const { id } = req.params;
  const user = await UserModel.findOne({ _id: id });
  try {
    if (fullName) {
      user.fullName = fullName;
    }
    if (phoneNumber) {
      if (user.phoneNumber === phoneNumber) {
        user.phoneNumber = phoneNumber;
      } else {
        const checkphone = await UserModel.findOne({
          phoneNumber: phoneNumber,
        });
        if (checkphone) {
          return res.status(400).json({ message: "SDT da duoc dang ky" });
        }
        user.phoneNumber = phoneNumber;
      }
    }
    if (address) {
      user.address = address;
    }
    if (major) {
      user.major = major;
    }
    await user.save();
    res.status(200).json({ message: "Cap  nhat thanh cong", user: user });
  } catch (err) {
    return res.status(400).json({ message: "Co su co  xay ra" });
  }
};

export const changePassword = async (req, res) => {
  const { password, changePassword, confirmPassword } = req.body;
  const { id } = req.params;
  const user = await UserModel.findOne({ _id: id });
  var count = 0;
  try {
    if (password !== user.password)
      return res.status(400).json({ message: "Sai mat khau hien tai" });
    if (password == changePassword)
      return res
        .status(400)
        .json({ message: "Mat khau khong the trung voi mat khau hien tai" });
    if (changePassword !== confirmPassword)
      return res.status(400).json({
        message: "Mat khau xac nhan phai trung voi mat khau muon thay doi",
      });
    user.password = changePassword;
    user.save();
    res
      .status(200)
      .json({ message: "Thay doi mat khau thanh cong", user: user });
  } catch (err) {
    return res.status(400).json({ message: "Co su co  xay ra" });
  }
};

// export const updateUser = async (req, res) => {
//   const { fullName, phoneNumber, address, major } = req.body;
//   const { id } = req.params;
//   if (!fullName || !phoneNumber || !address || !major) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Vui long nhap day du thong tin!" });
//   }

//   //check phoneNumber
//   const checkphoneNumber = await UserModel.findOne({ phoneNumber });
//   if (checkphoneNumber) {
//     return res
//       .status(400)
//       .json({ success: false, message: "So dien thoai da ton tai!" });
//   }
//   try {
//     const updateUser = req.body;
//     console.log("user", updateUser);

//     const userUpdated = await UserModel.findByIdAndUpdate(id, updateUser);
//     const user = await userUpdated.save();

//     console.log("userUpdated", userUpdated);

//     res.status(200).json(user);
//   } catch (err) {
//     res.status(500).json({ success: false, err: "cap nhat that bai" });
//   }
// };
