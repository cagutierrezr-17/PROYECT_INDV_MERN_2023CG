import UserStore from "../models/userModel.js";
import bcrypt from "bcrypt";

// metodo para capturar y guardar los datos del usuario junto con la contraseña encriptada
const userStoreRegister = async (req, res) => {
  try {
    let userData = req.body;
    userData.password = bcrypt.hashSync(userData.password, 10);
    let register = await UserStore.create(userData);
    res.status(200).json(register);
  } catch (e) {
    res.status(400).json({
      message: e.message,
    });
  }
};

// metodo para comparar el correo del usuario y verificar si existe y posterior la comparación del password y ver si coinciden para pasar a otra sección
const userStoreLogin = async (req, res) => {
  let resultUser = await UserStore.findOne({
    email: req.body.email,
  });
  if (resultUser === null) {
    res.status(200).json(false);
    return;
  }
  const resultPasswordCompare = bcrypt.compareSync(req.body.password, resultUser.password);
  res.status(200).json(resultPasswordCompare);

  // console.log(resultPasswordCompare);
};

export { userStoreRegister, userStoreLogin };