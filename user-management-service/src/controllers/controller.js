const authService = require("../services/service");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await authService.login(username, password);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

const logout = (req, res) => {
  res.status(200).json({ status: "success", message: "Successfully logged out" });
};

module.exports = { login, logout };
