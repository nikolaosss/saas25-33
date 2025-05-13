const authService = require("../services/service");

const login = async (req, res) => {
  const { email, password } = req.body;

  console.log("🟡 Login request received:", { email, password }); 

  try {
    const result = await authService.login(email, password);
    console.log("✅ Login successful:", result); 
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ Login failed:", err); 
    res.status(err.status || 500).json({ status: "failed", message: err.message });
  }
};

const logout = (req, res) => {
  console.log("👋 Logout request received");
  res.status(200).json({ status: "success", message: "Successfully logged out" });
};

module.exports = { login, logout };
