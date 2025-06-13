import { Routes, Route, Navigate } from 'react-router-dom';
import UploadPage from './pages/UploadPage';
import MyDocuments from './pages/MyDocuments';
// import Login from './pages/Login';
// import AuthSuccess from './pages/AuthSuccess';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Routes>
      {/* <Route path="/auth-success" element={<AuthSuccess />} />
      <Route path="/login" element={<Login />} /> */}
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
  );
}

export default App;
