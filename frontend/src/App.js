import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MyCoursesPage from "./pages/MyCoursesPage";
import ViewGradesPage from './pages/ViewGradesPage';
import PostInitialGradesPage from './pages/PostInitialGradesPage';
import PostFinalGradesPage from './pages/PostFinalGradesPage';
import InstructorRepliesPage from './pages/InstructorRepliesPage';
import InstructorHomePage from './pages/InstructorHomePage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/my-courses" element={<MyCoursesPage />} />
        <Route path="/grades/view/:courseId" element={<ViewGradesPage />} />
        <Route path="/post-initial-grades" element={<PostInitialGradesPage />} />
        <Route path="/post-final-grades" element={<PostFinalGradesPage />} />
        <Route path="/instructor-replies" element={<InstructorRepliesPage />} />
        <Route path="/instructor-home" element={<InstructorHomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
