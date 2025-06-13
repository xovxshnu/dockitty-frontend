import { Routes, Route, Navigate } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import MyDocuments from './pages/MyDocuments';
import Login from './pages/Login';
import AuthSuccess from './pages/AuthSuccess';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/auth-success" element={<AuthSuccess />} />

      {/* Protected Routes */}
      <Route
        path="/upload"
        element={
          <PrivateRoute>
            <UploadPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/my-documents"
        element={
          <PrivateRoute>
            <MyDocuments />
          </PrivateRoute>
        }
      />

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/upload" replace />} />
    </Routes>
  );
}

export default App;
