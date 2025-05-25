const jwt = require("jsonwebtoken");
const dbConnection = require("../db");

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

const login = async (email, password) => {
  if (!email || !password) {
    throw { status: 400, message: "Email and password are required" };
  }

  const [rows] = await dbConnection.execute(
    `SELECT id, email, password, role, academic_id
     FROM uss
     WHERE email = ?`,
    [email]
  );

  if (rows.length === 0 || rows[0].password !== password) {
    throw { status: 401, message: "Invalid email or password" };
  }

  const user = rows[0];

  const tokenPayload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  if (user.academic_id) {
    tokenPayload.academicId = user.academic_id;
  }

  const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: "1h" });

  return {
    status: "success",
    token,
    role: user.role,
    academicId: user.academic_id || null,
    email: user.email,
  };
};

const changePassword = async (userId, oldPassword, newPassword) => {
  const [rows] = await dbConnection.execute(
    `SELECT password FROM uss WHERE id = ?`,
    [userId]
  );

  if (rows.length === 0 || rows[0].password !== oldPassword) {
    throw { status: 401, message: "Old password is incorrect" };
  }

  await dbConnection.execute(
    `UPDATE uss SET password = ? WHERE id = ?`,
    [newPassword, userId]
  );

  return "Password updated successfully";
};

module.exports = { login, changePassword };

