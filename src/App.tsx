import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import MyDocuments from './pages/MyDocuments';
import Login from './pages/Login';
import Register from './pages/Register';

// Reusable auth-protected route wrapper
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <UploadPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/docs"
          element={
            <PrivateRoute>
              <MyDocuments />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/upload" />} />
      </Routes>
    </Router>
  );
}

export default App;
