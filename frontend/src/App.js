import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MyCoursesPage from "./pages/MyCoursesPage";
import ViewGradesPage from './pages/ViewGradesPage';
import PostInitialGradesPage from './pages/PostInitialGradesPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route path="/grades/view/:courseId" element={<ViewGradesPage />} />
        <Route path="/post-initial-grades" element={<PostInitialGradesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
