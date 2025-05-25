import { useState } from "react";
import "../styles/Login.css";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.status === "success") {
        localStorage.setItem("token", data.token);
        
        localStorage.setItem("role", data.role);
        localStorage.setItem("academicId", data.academicId);
        localStorage.setItem("email", data.email); 
        onLogin(data);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="login-box">
      <h2>Welcome to clearSKY</h2>
      <form onSubmit={handleSubmit}>
        <label>Please enter your credentials</label>
        <input
          type="text"
          placeholder="user name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>

      {message && (
        <div className="message-area">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
