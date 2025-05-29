import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (data) => {
    const { role, token, email } = data;

    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
    
    if (role === "instructor") {
      navigate("/instructor-home"); // ✅ ΝΕΑ ΔΙΑΔΡΟΜΗ
    } else {
      navigate("/my-courses");
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
