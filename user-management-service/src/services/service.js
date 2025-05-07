const jwt = require("jsonwebtoken");
const dbConnection = require("../db");

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";

const login = async (email, password) => {
  if (!email || !password) {
    throw { status: 400, message: "Email and password are required" };
  }

  const [rows] = await dbConnection.execute(
    `SELECT id, email, password, role, academic_id
     FROM users
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
  };
};

module.exports = { login };
