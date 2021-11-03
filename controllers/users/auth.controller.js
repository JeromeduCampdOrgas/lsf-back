const UserModel = require("../../models/user.model");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../../utils/errors.utils");
const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id, isAdmin, pseudo, email) => {
  return jwt.sign({ id, isAdmin, pseudo, email }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

module.exports.signUp = async (req, res) => {
  const { pseudo, email, password, isAdmin } = req.body;
  console.log(req.body);
  try {
    const user = await UserModel.create({ pseudo, email, password, isAdmin });
    res.status(201).json({ user: user._id });
    console.log(user);
  } catch (err) {
    const errors = signUpErrors(err);
    res.status(200).send({ errors });
  }
};

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(
      user._id,
      user.isAdmin,
      user.pseudo,
      user.email,
      user.password
    );
    res.cookie("token", token, { httpOnly: true, maxAge });
    res.status(200).json({
      token: token,
      user: user._id,
      pseudo: user.pseudo,
      isAdmin: user.isAdmin,
      email: user.email,
    });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(200).json({ errors });
  }
};

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
